import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

/* ================= SAFE LOCAL STORAGE READ ================= */

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined") return null;
    return JSON.parse(user);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

const getTempUserFromStorage = () => {
  try {
    const user = localStorage.getItem("tempUser");
    if (!user || user === "undefined") return null;
    return JSON.parse(user);
  } catch {
    localStorage.removeItem("tempUser");
    return null;
  }
};

const getTokenFromStorage = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") return null;
    return token; // ⚠ token stringify nahi kiya gaya service me
  } catch {
    localStorage.removeItem("token");
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(),
  tempUser: getTempUserFromStorage(),
  token: getTokenFromStorage(),

  isRegistrationLoading: false,
  isRegistrationSuccess: false,
  isRegistrationError: false,
  registrationMessage: "",

  isLoginLoading: false,
  isLoginSuccess: false,
  isLoginError: false,
  loginMessage: "",

  isOtpVerificationLoading: false,
  isOtpVerificationSuccess: false,
  isOtpVerificationError: false,
  otpVerificationMessage: "",

  isResendOtpLoading: false,
  isResendOtpSuccess: false,
  isResendOtpError: false,
  resendOtpMessage: "",

  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

/* ================= THUNKS ================= */

// REGISTER
export const registerUser = createAsyncThunk(
  "AUTH/REGISTER",
  async (formData, thunkAPI) => {
    try {
      return await authService.register(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message,
      );
    }
  },
);

// VERIFY REGISTER OTP
export const verifyRegisterOtpThunk = createAsyncThunk(
  "AUTH/VERIFY_REGISTER_OTP",
  async (data, thunkAPI) => {
    try {
      return await authService.verifyRegisterOtp(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message,
      );
    }
  },
);

// LOGIN (SEND OTP)
export const loginUser = createAsyncThunk(
  "AUTH/LOGIN",
  async (formData, thunkAPI) => {
    try {
      return await authService.login(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message,
      );
    }
  },
);

// VERIFY LOGIN OTP
export const verifyLoginOtpThunk = createAsyncThunk(
  "AUTH/VERIFY_LOGIN_OTP",
  async (data, thunkAPI) => {
    try {
      return await authService.verifyLoginOtp(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message,
      );
    }
  },
);

// RESEND REGISTER OTP
export const resendRegisterOtpThunk = createAsyncThunk(
  "AUTH/RESEND_REGISTER_OTP",
  async (data, thunkAPI) => {
    try {
      return await authService.resendRegisterOtp(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message,
      );
    }
  },
);

// RESEND LOGIN OTP
export const resendLoginOtpThunk = createAsyncThunk(
  "AUTH/RESEND_LOGIN_OTP",
  async (data, thunkAPI) => {
    try {
      return await authService.resendLoginOtp(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message,
      );
    }
  },
);

// LOGOUT
export const logOutUser = createAsyncThunk("AUTH/LOGOUT", async () => {
  authService.logout();
});

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isRegistrationLoading = false;
      state.isRegistrationSuccess = false;
      state.isRegistrationError = false;
      state.registrationMessage = "";

      state.isLoginLoading = false;
      state.isLoginSuccess = false;
      state.isLoginError = false;
      state.loginMessage = "";

      state.isOtpVerificationLoading = false;
      state.isOtpVerificationSuccess = false;
      state.isOtpVerificationError = false;
      state.otpVerificationMessage = "";

      state.isResendOtpLoading = false;
      state.isResendOtpSuccess = false;
      state.isResendOtpError = false;
      state.resendOtpMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isRegistrationLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRegistrationLoading = false;
        state.isRegistrationSuccess = true;
        state.tempUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRegistrationLoading = false;
        state.isRegistrationError = true;
        state.registrationMessage = action.payload;
      })

      // VERIFY REGISTER OTP
      .addCase(verifyRegisterOtpThunk.pending, (state) => {
        state.isOtpVerificationLoading = true;
      })
      .addCase(verifyRegisterOtpThunk.fulfilled, (state, action) => {
        state.isOtpVerificationLoading = false;
        state.isOtpVerificationSuccess = true;

        if (action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      })
      .addCase(verifyRegisterOtpThunk.rejected, (state, action) => {
        state.isOtpVerificationLoading = false;
        state.isOtpVerificationError = true;
        state.otpVerificationMessage = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoginLoading = false;
        state.isLoginSuccess = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isLoginError = true;
        state.loginMessage = action.payload;
      })

      // VERIFY LOGIN OTP
      .addCase(verifyLoginOtpThunk.fulfilled, (state, action) => {
        state.isOtpVerificationSuccess = true;

        if (action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      })

      // LOGOUT
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.tempUser = null;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
