import axios from "axios";

const API_URL = "/api/cart/";

// ===== GET TOKEN =====
const getToken = () => {
  return localStorage.getItem("token");
};

// ===== ADD TO CART =====
const addToCart = async (cartData, token) => {
  // Accept token as parameter
  const authToken = token || getToken(); // Use passed token or get from localStorage

  const response = await axios.post(API_URL + "add", cartData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};

// ===== GET CART =====
const getCart = async (token) => {
  // Accept token as parameter
  const authToken = token || getToken();

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};

// ===== UPDATE CART =====
const updateCart = async (cartData, token) => {
  // Accept token as parameter
  const authToken = token || getToken();

  const response = await axios.put(API_URL + "update", cartData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};

// ===== REMOVE CART =====
const removeCart = async (cartData, token) => {
  // Accept token as parameter
  const authToken = token || getToken();

  const response = await axios.delete(API_URL + "remove", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: cartData,
  });

  return response.data;
};

const cartService = {
  addToCart,
  getCart,
  updateCart,
  removeCart,
};

export default cartService;
