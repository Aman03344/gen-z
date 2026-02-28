const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  register,
  privateRoute,
  verifyOTP,
  resendOTP,
  loginWithOTP,
  loginOtpVerify,
  resendLoginOTP,
} = require("../controllers/authController");

const router = express.Router();

// register
router.post("/register", register);
router.post("/verify-register-otp", verifyOTP);
router.post("/resend-register-otp", resendOTP);

// login
router.post("/login", loginWithOTP);
router.post("/verify-login-otp", loginOtpVerify);
router.post("/resend-login-otp", resendLoginOTP);
// router.get("/all-users",getAllUsers)

router.get("/private", protect, privateRoute);

module.exports = router;
