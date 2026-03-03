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
    } = req.body;

    // Basic Validation
    if (
      !name ||
      !description ||
      !brand ||
      !category ||
      !price ||
      !countInStock ||
      !image ||
      !discountPrice ||
      !sizes ||
      !discountPercentage
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Discount validation
    if (discountPrice && discountPrice >= price) {
      return res.status(400).json({
        success: false,
        message: "Discount price must be less than actual price",
      });
    }

    const newProduct = await Product.create({
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
    });

    if (!newProduct) {
      return res.status(400).json({ message: "Failed to create product" });
    }

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
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
    if (!users) {
      res.status(404).json(users);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProduct, updateProduct, deleteProduct };
