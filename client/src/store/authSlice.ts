import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export const API_URL = import.meta.env.VITE_SERVER_URL;

interface ApiResponse {
  success: boolean;
  message: string;
}

export interface User {
  id: string;
  role: string;
  name: string;
  email: string;
}

interface RegisterResponse extends ApiResponse {}
interface LoginResponse extends ApiResponse {
  user: User;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  userExists: boolean;
  otpVerified: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoading: false,
  error: null,
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated") || "false"),
  userExists: false,
  otpVerified:false,
};

export const initiateRegistrationUser = createAsyncThunk<
  RegisterResponse,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/initiateRegistrationUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_URL}auth/register/initiate`,
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration initaition failed"
    );
  }
});

export const completeRegistration = createAsyncThunk<
  ApiResponse,
  { email: string; otp: string },
  { rejectValue: string }
>("auth/completeRegistration", async ({ email, otp }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_URL}auth/register/complete`,
      { email, otp },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "An error occurred while completing registration."
    );
  }
});

export const loginUser = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_URL}auth/login`,
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const updatePassword = createAsyncThunk<
  ApiResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/updatePassword", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_URL}auth/update-password`,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ||
        "Erreur lors de la mise à jour du mot de passe"
    );
  }
});

export const checkUser = createAsyncThunk<
  ApiResponse,
  string,
  { rejectValue: string }
>("auth/checkUser", async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_URL}auth/check-user`,
      { email }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Erreur lors de la vérification"
    );
  }
});

export const checkPendingUser = createAsyncThunk<
  ApiResponse,
  string,
  { rejectValue: string }
>("auth/checkPendingUser", async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_URL}auth/check-pending-user`,
      { email }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Erreur lors de la vérification"
    );
  }
});


export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    `${API_URL}auth/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
});

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(`${API_URL}auth/checkauth`, {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store,no cache, must-revalidate, proxy-revalidate",
    },
  });
  return response.data;
});
export const verifyOtp = createAsyncThunk<
  ApiResponse,
  { email: string; otp: string },
  { rejectValue: string }
>("auth/verifyOtp", async ({ email, otp }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_URL}auth/verify-otp`,
      { email, otp },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "OTP verification failed"
    );
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- REGISTER ---
      .addCase(initiateRegistrationUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initiateRegistrationUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(initiateRegistrationUser.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(completeRegistration.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(completeRegistration.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(completeRegistration.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = false;
      })

      // --- LOGIN ---
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user : null;
          state.isAuthenticated = action.payload.success;
        }
      )
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // --- CHECK AUTH ---
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("checkauth pending")
      })
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          if (action.payload.success) {
            state.user = action.payload.user;

            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("isAuthenticated", "true");
          }
          state.isLoading = false;
        }
      )
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        console.log("checkauth rejectetd")

        state.user = null;
        state.isAuthenticated = false;
      })

      // --- LOGOUT ---
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })

      // --- CHECK USER ---
      .addCase(checkUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userExists = true;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.isLoading = false;
        state.userExists = false;
        state.error = action.payload as string;
      })
      .addCase(checkPendingUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkPendingUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userExists = true;
      })
      .addCase(checkPendingUser.rejected, (state, action) => {
        state.isLoading = false;
        state.userExists = false;
        state.error = action.payload as string;
      })

      // --- UPDATE PASSWORD ---
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updatePassword.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.isLoading = false;
        }
      )
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        verifyOtp.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.isLoading = false;
          state.otpVerified = true;
        }
      )
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
