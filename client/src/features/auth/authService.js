import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

// ================= REGISTER =================

// ❌ Yaha kuch bhi localStorage me store nahi karna

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  localStorage.setItem("tempUser", JSON.stringify(response.data));
  return response.data;
};

// ================= VERIFY REGISTER OTP =================
// ❌ Yaha bhi localStorage nahi
const verifyRegisterOtp = async (data) => {
  const response = await axios.post(API_URL + "verify-register-otp", data);
  localStorage.setItem("token", JSON.stringify(response.data.token));
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

// ================= RESEND REGISTER OTP =================
const resendRegisterOtp = async (data) => {
  const response = await axios.post(API_URL + "resend-register-otp", data);

  return response.data;
};

// ================= LOGIN (Send OTP) =================
// ❌ Yaha token store nahi karna
const login = async (data) => {
  const response = await axios.post(API_URL + "login", data);
  localStorage.setItem("token", JSON.stringify(response.data.token));
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

// ================= VERIFY LOGIN OTP =================
// ✅ SIRF YAHI JAGAH localStorage USE HOGA
const verifyLoginOtp = async (data) => {
  const response = await axios.post(API_URL + "verify-login-otp", data);

  // Token sirf successful login pe store karo
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

// ================= RESEND LOGIN OTP =================
const resendLoginOtp = async (data) => {
  const response = await axios.post(API_URL + "resend-login-otp", data);

  return response.data;
};

// ================= PRIVATE ROUTE =================
// Yaha manually token attach karenge
const getPrivate = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL + "private", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ================= LOGOUT =================
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const authService = {
  register,
  verifyRegisterOtp,
  resendRegisterOtp,
  login,
  verifyLoginOtp,
  resendLoginOtp,
  getPrivate,
  logout,
};

export default authService;
