const express = require("express");
const { placeOrder, getUserOrders } = require("../controllers/orderController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/place", protect, placeOrder);
router.get("/my/orders", protect, getUserOrders);

module.exports = router;
