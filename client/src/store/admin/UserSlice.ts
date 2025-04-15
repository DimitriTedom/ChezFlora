import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, Role, User, UsersRole } from "../authSlice";
interface AdminUserState {
  users: User[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

interface FetchUsersParams {
  page?: number;
  limit?: number;
  role?: UsersRole | " ";
  search?: string;
}
interface UpdateUserRolesPayload {
  userIds: string[];
  role: Role;
}

interface DeleteUsersPayload {
  userIds: string[];
}
interface getAllUsersApiResponse {
  success: boolean;
  message: string;
  data: User[];
  meta: {
    totalUsers: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
interface updateAndDeleteApiResponse {
  success: boolean;
  message: string;
}
interface RegisterResponse {
  success: boolean;
  message: string;
}
const initialState: AdminUserState = {
  users: [] as User[],
  isLoading: false,
  isUpdating: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};
export const adminCreateUser = createAsyncThunk<
  RegisterResponse,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("adminUser/adminCreateUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_URL}admin/users/create`,
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration  failed"
    );
  }
});
export const getAllUsers = createAsyncThunk<
  getAllUsersApiResponse,
  FetchUsersParams,
  { rejectValue: string }
>(
  "adminUser/getAllUsers",
  async (params: FetchUsersParams, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}admin/users/get`, {
        params: {
          page: params.page,
          limit: params.limit,
          role: params.role,
          search: params.search,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateUserRoles = createAsyncThunk<
  updateAndDeleteApiResponse,
  UpdateUserRolesPayload,
  { rejectValue: string }
>(
  "adminUser/updateUserRoles",
  async (payload: UpdateUserRolesPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}admin/users/update-roles`,
        payload,
        { withCredentials: true }
      );
      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to update user roles"
      );
    }
  }
);
export const deleteUsers = createAsyncThunk<
  updateAndDeleteApiResponse,
  DeleteUsersPayload,
  { rejectValue: string }
>(
  "adminUser/deleteUsers",
  async (payload: DeleteUsersPayload, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}admin/users/delete`, {
        data: payload,
        withCredentials: true,
      });
      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to delete users"
      );
    }
  }
);

const adminUserSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.pagination.total = action.payload.meta.totalUsers;
        state.pagination.page = action.payload.meta.page;
        state.pagination.limit = action.payload.meta.limit;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch users";
      })
      .addCase(adminCreateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminCreateUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(adminCreateUser.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUserRoles.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateUserRoles.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.users = state.users.map((user: User) => {
          if (action.meta.arg.userIds.includes(user.id)) {
            return { ...user, role: action.meta.arg.role };
          }
          return user;
        });
      })
      .addCase(updateUserRoles.rejected, (state, action) => {
        state.isUpdating = false;
        state.error =
          (action.payload as string) || "Failed to update user roles";
      })
      .addCase(deleteUsers.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.users = state.users.filter(
          (user: User) => !action.meta.arg.userIds.includes(user.id)
        );
        state.pagination.total =
          state.pagination.total - action.meta.arg.userIds.length;
        // state.pagination.page = Math.ceil(state.pagination.total / state.pagination.limit);
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = (action.payload as string) || "Failed to delete users";
      });
  },
});
// export const selectAdminUsers = (state:RootState)=> state.adminUsers;
export const { resetUserState } = adminUserSlice.actions;
export default adminUserSlice.reducer;
