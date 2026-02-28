const { mongoose } = require("mongoose");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity = 1 } = req.body;

    // 1 Validate quantity
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }

    // 2 Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 3 Check stock
    if (product.countInStock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    // 4 Check if already in cart
    let cartItem = await Cart.findOne({
      user: userId,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += quantity;

      // Stock re-check
      if (cartItem.quantity > product.countInStock) {
        return res.status(400).json({
          success: false,
          message: "Exceeds available stock",
        });
      }

      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user: userId,
        product: productId,
        quantity,
      });
    }

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cartItems = await Cart.find({ user: userId }).populate("product");

    // Remove invalid products
    const validItems = cartItems.filter((item) => item.product);

    // Calculate totals
    let subtotal = 0;

    validItems.forEach((item) => {
      subtotal += item.product.discountPrice * item.quantity;
    });

    res.status(200).json({
      success: true,
      count: validItems.length,
      subtotal,
      cartItems: validItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const userID = req.user._id;
    const { productId, quantity } = req.body;

    // 1 Validate quantity
    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be negative",
      });
    }

    // 2 Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 3 If quantity = 0 → remove item
    if (quantity === 0) {
      await Cart.findOneAndDelete({
        product: productId,
        user: userID,
      });

      return res.status(200).json({
        success: true,
        message: "Item removed from cart",
      });
    }

    // 4 Check stock
    if (quantity > product.countInStock) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds stock",
      });
    }

    // 5 Update cart
    const updated = await Cart.findOneAndUpdate(
      { product: productId, user: userID },
      { quantity },
      { new: true },
    ).populate("product", "name price discountPrice image");

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartItem: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    // 1 Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // 2 Delete item
    const deletedItem = await Cart.findOneAndDelete({
      product: productId,
      user: userId,
    });

    // 3 If item not found
    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed successfully",
      cartItem: deletedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { addToCart, getCart, updateCart, removeCart };
