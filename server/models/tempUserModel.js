const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      enum: ["register", "login"],
      required: true,
    },

    otpExpire: {
      type: Date,
      required: true,
    },

    resendCount: {
      type: Number,
      default: 0,
    },

    lastOtpSentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// TTL: delete exactly at otpExpire time
tempUserSchema.index({ otpExpire: 1 }, { expireAfterSeconds: 0 });

// prevent duplicate entries
tempUserSchema.index({ email: 1, purpose: 1 }, { unique: true });

module.exports = mongoose.model("TempUser", tempUserSchema);
