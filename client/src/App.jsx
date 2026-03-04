import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Revenue from "./pages/admin/Revenue";
import MyCart from "./pages/MyCart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import VerifyRegisterOtp from "./pages/VerifyRegisterOtp";
import VerifyLoginOtp from "./pages/VerifyLoginOtp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="mycart" element={<MyCart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route path="register" element={<Register />} />
        <Route path="/verify-register-otp" element={<VerifyRegisterOtp />} />
        <Route path="/verify-login-otp" element={<VerifyLoginOtp />} />
        <Route path="login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="revenue" element={<Revenue />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
