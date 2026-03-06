import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

// ================= GET ALL PRODUCTS =================
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await productService.getAllProducts();
      return response; // This now returns just the products array
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// ================= GET SINGLE PRODUCT =================
export const getProduct = createAsyncThunk(
  "products/getOne",
  async (pid, thunkAPI) => {
    try {
      return await productService.getProduct(pid);
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    isLoading: false,
    isError: false,
    message: "",
  },

  reducers: {
    resetProductState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= GET ALL PRODUCTS =================
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        // Now action.payload is directly the products array
        state.products = action.payload || [];
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= GET SINGLE PRODUCT =================
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;