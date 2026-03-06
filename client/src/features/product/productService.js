import axios from "axios";

const API_URL = "/api/products/";

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
