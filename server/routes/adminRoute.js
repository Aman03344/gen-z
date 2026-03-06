const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
} = require("../controllers/adminController");
const adminProtect = require("../middlewares/adminMiddleware");

const router = express.Router();

// product api's
router.post("/add/product", adminProtect, addProduct);
router.put("/product/:pid", adminProtect, updateProduct);
router.delete("/product/:pid", adminProtect, deleteProduct);
router.get("/users", adminProtect, getAllUsers);

module.exports = router;
