const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  addToCart,
  getCart,
  updateCart,
  removeCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/update", protect, updateCart);
router.delete("/remove", protect, removeCart);

module.exports = router;
