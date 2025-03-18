// store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Définition des types pour l'utilisateur et l'état d'authentification
interface ApiResponse {
  success: boolean;
  message: string;
}

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
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
  isAuthenticated:false,
};

// Action asynchrone pour l'enregistrement d'un utilisateur
export const registerUser = createAsyncThunk<
RegisterResponse, // Type de retour en cas de succès
  { name: string; email: string; password: string }, // Type des paramètres attendus
  { rejectValue: string }
>(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData,
        { withCredentials: true }
      );
      return response.data; //this data is just a json containing succes boolean and message from backend part which is to be displated in the user side by toast
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);
export const loginUser = createAsyncThunk<
LoginResponse, // Type de retour en cas de succès
  { email: string; password: string }, // Type des paramètres attendus
  { rejectValue: string }
>(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        userData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);
export const newPassword = createAsyncThunk<
  User, // Type de retour en cas de succès
  { email: string; password: string }, // Type des paramètres attendus
  { rejectValue: string }
>(
  "auth/enter-new-password", async (userNewData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/enter-new-password",
        userNewData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Password modification failed"
      )
    }
  }
)
export const logoutUser = createAsyncThunk("/auth/logout", 
  async () => {
    const response = await axios.post("http://localhost:5000/api/auth/logout",{},{withCredentials:true});
    return response.data
  }
);

export const checkAuth = createAsyncThunk("/auth/checkauth",
  async () => {
  const response = await axios.get("http://localhost:5000/api/auth/checkauth",{withCredentials:true,
    headers:{
      "Cache-Control":
          "no-store,no cache, must-revalidate, proxy-revalidate",
    },
  }
);
  return response.data;
})
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => { //action: PayloadAction<User>
        state.isLoading = false;
        state.user = null; //action.payload as string normally but i want the user to login after signup to be authenticated
        state.isAuthenticated=false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action:PayloadAction<LoginResponse>) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated= action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user= null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
