import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL

// Konsa URL hit ho raha hai check karo
console.log("Request URL:", API_URL + "products/");

// Token check karo
console.log("Token exists:", !!localStorage.getItem("token"));

// ================= GET ALL PRODUCTS =================
const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data.products; // Return only the products array
};

// ================= GET SINGLE PRODUCT =================
const getProduct = async (pid) => {
  const response = await axios.get(API_URL + pid);
  return response.data;
};

const productService = {
  getAllProducts,
  getProduct,
};

export default productService;
