// store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Types généraux pour les réponses de l'API
interface ApiResponse {
  success: boolean;
  message: string;
}

// Définition du type User et des réponses spécifiques
interface User {
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
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  userExists: false,
};

// Thunk pour l'enregistrement d'un utilisateur
export const registerUser = createAsyncThunk<
  RegisterResponse,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration failed"
    );
  }
});

// Thunk pour la connexion
export const loginUser = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// Thunk pour la mise à jour du mot de passe
export const updatePassword = createAsyncThunk<
  ApiResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/updatePassword", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/update-password",
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

// Thunk pour vérifier l'existence d'un utilisateur
export const checkUser = createAsyncThunk<
  ApiResponse,
  string,
  { rejectValue: string }
>("auth/checkUser", async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/check-user",
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
    "http://localhost:5000/api/auth/logout",
    {},
    { withCredentials: true }
  );
  return response.data;
});

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get("http://localhost:5000/api/auth/checkauth", {
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
      "http://localhost:5000/api/auth/verify-otp",
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
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state) => {
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
      })
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          if (action.payload.success) {
            state.user = action.payload.user;
            state.isAuthenticated = true;
          }
          state.isLoading = false;
        }
      )
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
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
