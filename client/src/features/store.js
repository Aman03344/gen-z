import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import admin from "./adminFeature/adminSlice";
import products from "./product/productSlice";

const store = configureStore({
  reducer: { auth, admin, products },
});

export default store;
