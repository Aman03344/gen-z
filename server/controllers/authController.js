const tempUserModel = require("../models/tempUserModel");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const generateOTP = require("../utils/generateOTP");
const sendVerificationEmail = require("../utils/sendMailer");

const register = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    //  Basic validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "Please fill all required details",
      });
    }

    //  Check in main User collection
    const existingUser = await userModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    // Remove old temp users (clean state)
    await tempUserModel.deleteMany({
      $or: [{ email }, { phone }],
    });

    //  Generate OTP
    const otp = String(generateOTP());

    //  Create TempUser
    const tempUser = await tempUserModel.create({
      name,
      email,
      phone,
      otp,
      purpose: "register",
      otpExpire: Date.now() + 10 * 60 * 1000, // 10 min
      resendCount: 0,
      lastOtpSentAt: Date.now(),
    });

    // Send email
    const emailSent = await sendVerificationEmail({
      to: email,
      subject: "Verify your Email",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px; background-color: #f9fafb; text-align: center;">
      <h2 style="color: #111827; margin-bottom: 20px;">Mechanic App</h2>
      
      <p style="font-size: 16px; color: #374151;">Hi ${name || "User"},</p>
      
      <p style="font-size: 16px; color: #374151; margin-top: 10px;">
        Your OTP for email verification is:
      </p>
      
      <h1 style="font-size: 40px; font-weight: bold; color: #313131; letter-spacing: 4px; margin: 20px 0;">
        ${otp}
      </h1>
      
      <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">
        This OTP will expire in 10 minutes. Please do not share it with anyone.
      </p>

      <div style="margin-top: 30px; font-size: 12px; color: #9ca3af;">
        © 2026 Mechanic App. All rights reserved.
      </div>
    </div>
  `,
    });

    console.log(emailSent);
    if (!emailSent) {
      await tempUserModel.findByIdAndDelete(tempUser._id);
      return res.status(500).json({
        message: "Failed to send OTP email",
      });
    }

    // Final response
    return res.status(200).json({
      message: "OTP sent to email successfully",
      email: tempUser.email,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// verify register otp ------------

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1 Basic validation
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    // 2 Find temp user
    const tempUser = await tempUserModel.findOne({
      email,
      purpose: "register",
    });

    if (!tempUser) {
      return res.status(400).json({
        message: "OTP expired or not found. Please register again.",
      });
    }

    // 3 OTP expiry check
    if (tempUser.otpExpire < Date.now()) {
      await tempUserModel.deleteOne({ email });
      return res.status(400).json({
        message: "OTP expired. Please request a new one.",
      });
    }

    // 4 OTP match check
    if (tempUser.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // 5 Check if user already exists
    let user = await userModel.findOne({ email });

    if (user) {
      // Agar user already hai but not verified
      if (user.isVerified) {
        return res.status(400).json({
          message: "Email already verified. Please login.",
        });
      }

      user.isVerified = true;
      await user.save();
    } else {
      // New user create karo
      user = await userModel.create({
        name: tempUser.name,
        email: tempUser.email,
        phone: tempUser.phone,
        isVerified: true,
      });
    }

    // 6 Temp user delete
    await tempUserModel.deleteOne({
      email,
      purpose: "register",
    });

    // 7 JWT generate
    const token = generateToken(user._id);

    // 8 Success response
    return res.status(200).json({
      message: "Email verified successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// register resend OTP ----------------------
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res
        .status(400)
        .json({ message: "Email already verified. Please login!" });
    }

    // 3 find temp user
    const tempUser = await tempUserModel.findOne({
      email,
      purpose: "register",
    });
    if (!tempUser) {
      return res
        .status(400)
        .json({ messsage: "No pending OTP found. Please register again!" });
    }

    // resend limit check
    if (tempUser.resendCount >= 3) {
      return res
        .status(429)
        .json({ message: "OTP resend limit reached. Try again later" });
    }
    // 5 time gap check (60 seconds)
    const now = Date.now();
    if (now - tempUser.lastOtpSentAt < 60 * 1000) {
      return res
        .status(429)
        .json({ message: "Please wait 60 seconds before resending OTP" });
    }

    // generate otp

    const newOtp = String(generateOTP());

    tempUser.otp = newOtp;
    tempUser.otpExpire = now + 10 * 60 * 1000; // 10 min
    tempUser.resendCount += 1;
    tempUser.lastOtpSentAt = now;

    await tempUser.save();

    const emailSent = await sendVerificationEmail({
      to: email,
      subject: "Resend OTP - Email Verification",
      html: `
        <div style="font-family: Arial; max-width: 600px; margin:auto; padding:20px;">
          <h2>Mechanic App</h2>
          <p>Your new OTP is:</p>
          <h1>${newOtp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
        </div>
      `,
    });

    if (!emailSent) {
      return res
        .status(500)
        .json({ message: "Failed to resend OTP. Try again later!" });
    }

    return res.status(200).json({ message: "OTP resend successfully!" });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginWithOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // 1 User check
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register." });
    }

    // 2 Verified check
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Email not verified. Please verify first.",
      });
    }

    // 3 Clean old OTPs
    await tempUserModel.deleteMany({
      email,
      purpose: "login",
    });

    // 4 Generate OTP
    const otp = String(generateOTP());

    // 5 Save temp OTP
    await tempUserModel.create({
      email,
      otp,
      name: user.name,
      phone: user.phone,
      purpose: "login",
      otpExpire: Date.now() + 10 * 60 * 1000,
      resendCount: 0,
      lastOtpSentAt: Date.now(),
    });

    // 6 Send email
    await sendVerificationEmail({
      to: email,
      subject: "Login OTP",
      html: `
        <h2>Mechanic App Login</h2>
        <p>Your OTP for login is:</p>
        <h1>${otp}</h1>
        <p>Valid for 10 minutes</p>
      `,
    });

    return res.status(200).json({
      message: "OTP sent to email for login",
    });
  } catch (error) {
    console.log("Login OTP Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// login otp verify ---------------

const loginOtpVerify = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1️⃣ Basic validation
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    // 2️⃣ Check user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found. Please register.",
      });
    }

    // 3️⃣ Check user is verified
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Email not verified. Please verify first.",
      });
    }

    // 4️⃣ Get temp OTP
    const tempUser = await tempUserModel.findOne({
      email,
      purpose: "login",
    });

    if (!tempUser) {
      return res.status(400).json({
        message: "OTP expired or not requested",
      });
    }

    // 5️⃣ Check OTP expiry
    if (tempUser.otpExpire < Date.now()) {
      await tempUserModel.deleteOne({
        email,
        purpose: "login",
      });

      return res.status(400).json({
        message: "OTP expired. Please request again.",
      });
    }

    // 6️⃣ Check OTP match
    if (tempUser.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // 7️⃣ OTP valid → login success
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    // 8️⃣ Clean temp OTP
    await tempUserModel.findByIdAndDelete(tempUser._id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login OTP Verify Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const resendLoginOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists and is verified
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found. Please register.",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Email not verified. Please verify first.",
      });
    }

    // Find existing temp user
    let tempUser = await tempUserModel.findOne({
      email,
      purpose: "login",
    });

    // If no temp user exists, create a new one (like loginWithOTP does)
    if (!tempUser) {
      const otp = String(generateOTP());

      await tempUserModel.create({
        email,
        otp,
        name: user.name,
        phone: user.phone,
        purpose: "login",
        otpExpire: Date.now() + 10 * 60 * 1000,
        resendCount: 0,
        lastOtpSentAt: Date.now(),
      });

      await sendVerificationEmail({
        to: email,
        subject: "Login OTP",
        html: `<h2>Your Login OTP</h2><h1>${otp}</h1><p>Valid for 10 minutes</p>`,
      });

      return res.status(200).json({
        message: "Login OTP sent successfully",
      });
    }

    // If temp user exists, check resend limits
    if (tempUser.resendCount >= 3) {
      return res.status(429).json({
        message: "OTP resend limit reached. Please try again later.",
      });
    }

    const now = Date.now();
    if (now - tempUser.lastOtpSentAt < 60 * 1000) {
      return res.status(429).json({
        message: "Please wait 60 seconds before resending OTP",
      });
    }

    // Generate and update OTP
    const newOtp = String(generateOTP());

    tempUser.otp = newOtp;
    tempUser.otpExpire = now + 10 * 60 * 1000;
    tempUser.resendCount += 1;
    tempUser.lastOtpSentAt = now;

    await tempUser.save();

    await sendVerificationEmail({
      to: email,
      subject: "Login OTP",
      html: `<h2>Your Login OTP</h2><h1>${newOtp}</h1><p>Valid for 10 minutes</p>`,
    });

    return res.status(200).json({
      message: "Login OTP resent successfully",
    });
  } catch (error) {
    console.error("Resend Login OTP Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// JWT helper (future use)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });
};

const privateRoute = async (req, res) => {
  return res.status(200).json({ msg: "this is private" });
};

module.exports = {
  register,
  verifyOTP,
  privateRoute,
  resendOTP,
  loginWithOTP,
  loginOtpVerify,
  resendLoginOTP,
};
