import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import admin from "./adminFeature/adminSlice";
import products from "./product/productSlice";
import cart from "./cart/cartSlice";
import order from "./order/orderSlice";

const store = configureStore({
  reducer: { auth, admin, products, cart, order },
});

export default store;
