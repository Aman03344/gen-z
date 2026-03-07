import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL+"admin/";
const PRODUCTS_URL = import.meta.env.VITE_BACKEND_URL+"products/";

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

  return response.data;
};

// ================= UPDATE PRODUCT =================
const updateProduct = async ({ pid, productData }) => {
  const token = getToken();

  const response = await axios.put(API_URL + `product/${pid}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ================= DELETE PRODUCT =================
const deleteProduct = async (pid) => {
  const token = getToken();

  const response = await axios.delete(API_URL + `product/${pid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ================= GET ALL USERS =================
const getAllUsers = async () => {
  const token = getToken();

  const response = await axios.get(API_URL + "users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ================= GET ALL PRODUCTS =================
const getAllProducts = async () => {
  const response = await axios.get(PRODUCTS_URL);
  return response.data;
};

const adminService = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
  getAllProducts,
};

export default adminService;
