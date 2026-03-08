const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
    },

    brand: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      enum: {
        values: ["T-Shirt", "Shirt", "Jeans", "Jacket", "Hoodie", "Kurta"],
        message: "{VALUE} is not a valid category",
      },
      required: [true, "Product category is required"],
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },

    discountPrice: {
      type: Number,
      default: 0,
      min: [0, "Discount price cannot be negative"],
    },

    discountPercentage: {
      type: Number, // Changed from String to Number
      default: 0,
      min: [0, "Discount percentage cannot be negative"],
      max: [100, "Discount percentage cannot exceed 100"],
    },

    countInStock: {
      type: Number,
      required: [true, "Stock count is required"],
      min: [0, "Stock count cannot be negative"],
    },

    sizes: {
      type: [
        {
          type: String,
          enum: {
            values: ["S", "M", "L", "XL", "XXL"],
            message: "{VALUE} is not a valid size",
          },
        },
      ],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one size is required",
      },
    },

    image: {
      type: [
        {
          type: String,
          required: true,
          trim: true,
        },
      ],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one image is required",
      },
    },

    rating: {
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

// Text search index
productSchema.index({
  name: "text",
  description: "text",
  brand: "text",
  category: "text",
});

module.exports = mongoose.model("Product", productSchema);
