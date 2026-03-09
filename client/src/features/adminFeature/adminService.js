import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "admin/";
const PRODUCTS_URL = import.meta.env.VITE_BACKEND_URL + "products/";

// ================= GET TOKEN =================
const getToken = () => {
  return localStorage.getItem("token");
};

// ================= ADD PRODUCT =================
const addProduct = async (productData) => {
  const token = getToken();

  const response = await axios.post(API_URL + "add/product", productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // BUG FIX 1: Return the product object directly (handle nested response)
  return response.data?.product || response.data;
};

// ================= UPDATE PRODUCT =================
const updateProduct = async ({ pid, productData }) => {
  const token = getToken();

  const response = await axios.put(API_URL + `product/${pid}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Return the product object directly (handle nested response)
  return response.data?.product || response.data;
};

// ================= DELETE PRODUCT =================
const deleteProduct = async (pid) => {
  const token = getToken();

  const response = await axios.delete(API_URL + `product/${pid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Return deleted product id so slice can filter it out
  return response.data?.product || response.data || { _id: pid };
};

// ================= GET ALL USERS =================
const getAllUsers = async () => {
  const token = getToken();

  const response = await axios.get(API_URL + "users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

return response.data?.data || response.data?.users || response.data;
};

const getAllOrders = async () => {
  const token = getToken();

  const response = await axios.get(API_URL + "orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ================= GET ALL PRODUCTS =================
const getAllProducts = async () => {
  const response = await axios.get(PRODUCTS_URL);
  return response.data?.products || response.data?.data || response.data;
};

const adminService = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
  getAllProducts,
  getAllOrders,
};

export default adminService;
