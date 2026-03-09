import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
  products: [],
  users: [],
  orders: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// ================= ADD PRODUCT =================
export const addProduct = createAsyncThunk(
  "admin/addProduct",
  async (productData, thunkAPI) => {
    try {
      return await adminService.addProduct(productData);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// ================= UPDATE PRODUCT =================
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ pid, productData }, thunkAPI) => {
    try {
      return await adminService.updateProduct({ pid, productData });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// ================= DELETE PRODUCT =================
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (pid, thunkAPI) => {
    try {
      const result = await adminService.deleteProduct(pid);
      return { ...result, _id: result._id || pid };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// ================= GET ALL USERS =================
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllUsers();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// ================= GET ALL PRODUCTS =================
export const getAllProducts = createAsyncThunk(
  "admin/getAllProducts",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllProducts();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// ================= GET ALL ORDERS =================
export const getAllOrders = createAsyncThunk(
  "admin/getAllOrders",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllOrders();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdminState: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= ADD PRODUCT =================
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Product added successfully!";
        if (action.payload && action.payload._id) {
          state.products.push(action.payload);
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= UPDATE PRODUCT =================
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Product updated successfully!";
        if (action.payload && action.payload._id) {
          const index = state.products.findIndex(
            (p) => p._id === action.payload._id,
          );
          if (index !== -1) state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= DELETE PRODUCT =================
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Product deleted successfully!";
        if (action.payload?._id) {
          state.products = state.products.filter(
            (p) => p._id !== action.payload._id,
          );
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= GET ALL USERS =================
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= GET ALL PRODUCTS =================
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= GET ALL ORDERS =================
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle both { orders: [...] } and bare array responses
        const payload = action.payload;
        state.orders = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.orders)
            ? payload.orders
            : [];
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;
