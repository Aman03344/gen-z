import axios from "axios";

const API_URL = "/api/auth/";

// ================= REGISTER =================
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  localStorage.setItem("tempUser", JSON.stringify(response.data));
  localStorage.setItem("token", response.data.token); // 🔥 FIX: JSON.stringify hatao

  console.log(response.data);

  return response.data;
};

// ================= VERIFY REGISTER OTP =================
const verifyRegisterOtp = async (data) => {
  const response = await axios.post(API_URL + "verify-register-otp", data);
  localStorage.setItem("token", response.data.token); // 🔥 FIX: JSON.stringify hatao
  localStorage.setItem("user", JSON.stringify(response.data.user));
  console.log(response.data);
  return response.data;
};

// ================= LOGIN (Send OTP) =================
const login = async (data) => {
  const response = await axios.post(API_URL + "login", data);
  localStorage.setItem("token", response.data.token); // 🔥 FIX: JSON.stringify hatao
  localStorage.setItem("user", JSON.stringify(response.data.user)); // 🔥 FIX: response.data.user store karo
  return response.data;
};

// ================= VERIFY LOGIN OTP =================
// ✅ YEH WALA PEHLE SE SAHI HAI
const verifyLoginOtp = async (data) => {
  const response = await axios.post(API_URL + "verify-login-otp", data);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token); // ✅ SAHI
    localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ SAHI
  }

  return response.data;
};

// ================= RESEND REGISTER OTP =================
const resendRegisterOtp = async (data) => {
  const response = await axios.post(API_URL + "resend-register-otp", data);
  console.log(response.data);
  return response.data;
};

// ================= RESEND LOGIN OTP =================
const resendLoginOtp = async (data) => {
  const response = await axios.post(API_URL + "resend-login-otp", data);
  return response.data;
};

// ================= PRIVATE ROUTE =================
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
  localStorage.removeItem("tempUser");
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