const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminController");

const router = express.Router();

// product api's
router.post("/add/product", protect, addProduct);
router.put("/product/:pid", protect, updateProduct);
router.delete("/product/:pid", protect, deleteProduct);

module.exports = router;
