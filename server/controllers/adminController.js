const orderModel = require("../models/orderModel");
const Product = require("../models/productModel");
const userModel = require("../models/userModel");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      category,
      price,
      discountPrice,
      discountPercentage,
      countInStock,
      sizes,
      image,
      rating,
      isFeatured,
    } = req.body;

    // Basic Validation - Only required fields
    if (
      !name ||
      !description ||
      !category ||
      !price ||
      !countInStock ||
      !sizes ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required fields (name, description, category, price, countInStock, sizes, image)",
      });
    }

    // Image array validation
    if (!Array.isArray(image) || image.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // Sizes array validation
    const validSizes = ["S", "M", "L", "XL", "XXL"];
    const invalidSizes = sizes.filter((size) => !validSizes.includes(size));

    if (invalidSizes.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid sizes: ${invalidSizes.join(", ")}. Valid sizes: S, M, L, XL, XXL`,
      });
    }

    // Price validations
    if (price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    // Discount validations (if provided)
    if (discountPrice) {
      if (discountPrice >= price) {
        return res.status(400).json({
          success: false,
          message: "Discount price must be less than actual price",
        });
      }

      // Auto-calculate discount percentage if not provided
      if (!discountPercentage) {
        const calculatedDiscount = (
          ((price - discountPrice) / price) *
          100
        ).toFixed(1);
        req.body.discountPercentage = calculatedDiscount;
      }
    }

    // Count in stock validation
    if (countInStock < 0) {
      return res.status(400).json({
        success: false,
        message: "Count in stock cannot be negative",
      });
    }

    const newProduct = await Product.create({
      name,
      description,
      brand: brand || "", // Default empty string if not provided
      category,
      price,
      discountPrice: discountPrice || 0,
      discountPercentage: discountPercentage || "0",
      countInStock,
      sizes,
      image,
      rating: rating || 0,
      isFeatured: isFeatured || false,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not fount" });
    }

    res.status(200).json({
      scucess: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(pid);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: `No product found with id ${pid}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Product deleted successfully ${pid}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  const orders = await orderModel.find();
  if (!orders) {
    return res.status(404).json({ message: "" });
  }
  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
  getAllOrders,
};
