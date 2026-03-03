const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      mobile: { type: String, required: true },
      addressLine1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: "India" },
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      default: "COD",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "PartiallyPaid", "Paid"],
      default: "Pending",
    },

    advancePaid: {
      type: Number,
      default: 0,
    },

    remainingAmount: {
      type: Number,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
