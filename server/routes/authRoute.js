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
const limiter = require("../middlewares/rateLimiterMiddleware");

const router = express.Router();

// register
router.post("/register", limiter, register);
router.post("/verify-register-otp", limiter, verifyOTP);
router.post("/resend-register-otp", limiter, resendOTP);

// login
router.post("/login", limiter, loginWithOTP);
router.post("/verify-login-otp", limiter, loginOtpVerify);
router.post("/resend-login-otp", limiter, resendLoginOTP);
// router.get("/all-users",getAllUsers)

router.get("/private", protect, privateRoute);

module.exports = router;
