const Product = require("../models//productModel");
const Order = require("../models/orderModel");

// Create a new order
const placeOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "Order items missing" });
    }

    let itemsPrice = 0;
    const updatedOrderItems = [];

    for (let item of orderItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.title}`,
        });
      }

      const price = product.discountPrice || product.price;

      itemsPrice += price * item.quantity;

      // SNAPSHOT STORE
      updatedOrderItems.push({
        product: product._id,
        name: product.title,
        image: product.image[0],
        price,
        quantity: item.quantity,
      });
    }

    const deliveryCharge = 50;
    const totalAmount = itemsPrice + deliveryCharge;

    let advancePaid = 0;
    let remainingAmount = totalAmount;
    let paymentStatus = "Pending";

    if (paymentMethod === "COD") {
      advancePaid = 30;
      remainingAmount = totalAmount - 30;
      paymentStatus = "PartiallyPaid";
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems: updatedOrderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      advancePaid,
      remainingAmount,
      paymentStatus,
    });

    res.status(201).json({
      success: true,
      message: "Order created, proceed to payment",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { placeOrder, getUserOrders };
