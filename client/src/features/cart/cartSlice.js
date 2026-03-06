import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
  cart: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// ===== ADD TO CART =====
export const addToCart = createAsyncThunk(
  "cart/add",
  async (cartData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.token;

      return await cartService.addToCart(cartData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

// ===== GET CART =====
export const getCart = createAsyncThunk("cart/get", async (_, thunkAPI) => {
  try {
    return await cartService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// ===== UPDATE CART =====
export const updateCart = createAsyncThunk(
  "cart/update",
  async (cartData, thunkAPI) => {
    try {
      return await cartService.updateCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

// ===== REMOVE CART =====
export const removeCart = createAsyncThunk(
  "cart/remove",
  async (cartData, thunkAPI) => {
    try {
      return await cartService.removeCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // ADD
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // GET
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // UPDATE
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      // REMOVE
      .addCase(removeCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
