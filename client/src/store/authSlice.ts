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
      .addCase(loginUser.fulfilled, (state, action:PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated=true;
      })
      .addCase(loginUser.rejected, (state,action) => {
        state.isLoading = false;
        state.error = action.payload || "An unexpected error occured";
        state.isAuthenticated = false;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
