const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    category: {
      type: String,
      enum: ["T-Shirt", "Shirt", "Jeans", "Jacket", "Hoodie", "Kurta"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: String,
      required: true,
    },

    countInStock: {
      type: Number,
      required: true,
    },

    sizes: [
      {
        type: String,
        enum: ["S", "M", "L", "XL", "XXL"],
      },
    ],

    image: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

productSchema.index({
  name: "text",
  description: "text",
  brand: "text",
  category: "text",
});

module.exports = mongoose.model("Product", productSchema);
