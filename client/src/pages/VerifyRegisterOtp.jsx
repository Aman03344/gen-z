// pages/VerifyRegisterOtp.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyRegisterOtpThunk,
  resendRegisterOtpThunk,
  resetAuthState,
} from "../features/auth/authSlice";
import toast from "react-hot-toast";

const VerifyRegisterOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = location.state?.email;

  const {
    isOtpVerificationLoading,
    isOtpVerificationSuccess,
    isOtpVerificationError,
    otpVerificationMessage,
    isResendOtpLoading,
    isResendOtpSuccess,
    resendOtpMessage,
    user,
  } = useSelector((state) => state.auth);

  console.log(user);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Redirect if no email in state
  useEffect(() => {
    if (!email) {
      toast.error("No email found. Please register again.");
      navigate("/register");
    }
  }, [email, navigate]);

  // Handle OTP verification
  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }

    const loadingToast = toast.loading("Verifying OTP...");

    try {
      await dispatch(
        verifyRegisterOtpThunk({ email, otp: otpString }),
      ).unwrap();
      toast.dismiss(loadingToast);
    } catch (error) {
      toast.dismiss(loadingToast);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    const loadingToast = toast.loading("Resending OTP...");

    try {
      await dispatch(resendRegisterOtpThunk({ email })).unwrap();
      toast.dismiss(loadingToast);
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]); // Clear OTP fields

      // Focus first input
      document.getElementById("otp-0")?.focus();
    } catch (error) {
      toast.dismiss(loadingToast);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Allow only numbers
    if (value && !/^\d+$/.test(value)) return;

    // Always take only the last character typed
    const singleValue = value.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = singleValue;
    setOtp(newOtp);

    // Auto-focus next input if current field is filled
    if (singleValue && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };
  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Focus previous input on backspace when current is empty
        document.getElementById(`otp-${index - 1}`)?.focus();
      } else if (otp[index]) {
        // Clear current field on backspace
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      pastedData.split("").forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);

      // Focus last filled input
      const lastIndex = Math.min(pastedData.length - 1, 5);
      document.getElementById(`otp-${lastIndex}`)?.focus();
    }
  };

  // Handle verification success
  useEffect(() => {
    if (isOtpVerificationSuccess) {
      toast.success("Email verified successfully! You can now login.", {
        duration: 3000,
        icon: "✅",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [isOtpVerificationSuccess, navigate]);

  // Handle verification error
  useEffect(() => {
    if (isOtpVerificationError && otpVerificationMessage) {
      toast.error(otpVerificationMessage, {
        duration: 4000,
      });

      // Clear OTP fields on error
      setOtp(["", "", "", "", "", ""]);

      // Focus first input
      document.getElementById("otp-0")?.focus();
    }
  }, [isOtpVerificationError, otpVerificationMessage]);

  // Handle resend success
  useEffect(() => {
    if (isResendOtpSuccess && resendOtpMessage) {
      toast.success(resendOtpMessage || "OTP resent successfully!", {
        icon: "📧",
      });
    }
  }, [isResendOtpSuccess, resendOtpMessage]);

  // Resend timer
  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  // Clean up
  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
          <p className="text-gray-600">We've sent a verification code to</p>
          <p className="font-medium text-black mt-2 text-lg">{email}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* OTP Input Fields */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 text-center">
                Enter 6-digit OTP
              </label>

              <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1} // Changed from 6 to 1
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {/* Timer and Resend */}
              <div className="text-center mt-4">
                {!canResend ? (
                  <p className="text-sm text-gray-500">
                    Resend code in{" "}
                    <span className="font-medium text-black">
                      {formatTime(timer)}
                    </span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isResendOtpLoading}
                    className="text-sm text-black font-medium hover:underline disabled:text-gray-400 disabled:no-underline"
                  >
                    {isResendOtpLoading ? "Sending..." : "Resend OTP"}
                  </button>
                )}
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isOtpVerificationLoading || !isOtpComplete}
              className="w-full rounded-md py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              {isOtpVerificationLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify & Continue"
              )}
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Didn't receive the email? Check your spam folder
            </p>

            <Link
              to="/register"
              className="inline-block text-sm text-gray-600 hover:text-black"
            >
              ← Use different email
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-black">
            Return to store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyRegisterOtp;
