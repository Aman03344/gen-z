import axios from "axios";

const API_URL = "/api/order/";

// ================= GET TOKEN =================
const getToken = () => {
  return localStorage.getItem("token");
};

// ================= PLACE ORDER =================
const placeOrder = async (orderData) => {
  const token = getToken();

  const response = await axios.post(API_URL + "place", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ================= GET USER ORDERS =================
const getUserOrders = async () => {
  const token = getToken();

  const response = await axios.get(API_URL + "my/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const orderService = {
  placeOrder,
  getUserOrders,
};

export default orderService;
