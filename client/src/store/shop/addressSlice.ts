import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../authSlice";

// ---------------------
// Type Definitions
// ---------------------

export interface Address {
  id: string;
  userId: string;
  address: string;
  phone: string;
  city: string;
  postalCode: string;
  notes: string;
  isDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddressState {
  isLoading: boolean;
  addressList: Address[];
  error: string | null;
}

export interface AddAddressPayload {
  userId: string;
  address: string;
  phone: string;
  city: string;
  postalCode: string;
  notes: string;
  isDefault?: boolean;
}

export interface EditAddressPayload {
  userId: string;
  addressId: string;
  formData: Partial<AddAddressPayload>;
}

export interface DeleteAddressPayload {
  userId: string;
  addressId: string;
}

export interface AddressApiResponse<T = Address | Address[]> {
  success: boolean;
  message: string;
  data: T;
}

// Initial State

const initialState: AddressState = {
  isLoading: false,
  addressList: [],
  error: null,
};

// Asynchronous Thunks

export const addAddress = createAsyncThunk<
  AddressApiResponse<Address>,
  AddAddressPayload,
  { rejectValue: string }
>("address/addAddress", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}shop/address/add`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data.message || "Error adding address"
      );
    }
  }
});

export const fetchAllAddress = createAsyncThunk<
  AddressApiResponse<Address[]>,
  string,
  { rejectValue: string }
>("address/fetchAllAddress", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}shop/address/get/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data.message || "Error fetching address"
      );
    }
  }
});

export const editAddress = createAsyncThunk<
  AddressApiResponse<Address>,
  EditAddressPayload,
  { rejectValue: string }
>(
  "address/editAddress",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}shop/address/update/${userId}/${addressId}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.message || "Error editing address"
        );
      }
    }
  }
);

export const deleteAddress = createAsyncThunk<
  AddressApiResponse,
  DeleteAddressPayload,
  { rejectValue: string }
>(
  "address/deleteAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}shop/address/delete/${userId}/${addressId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.message || "Error deleting address"
        );
      }
    }
  }
);

// Slice Creation

const ShoppingAddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // addAddress
    builder.addCase(addAddress.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      addAddress.fulfilled,
      (state) => {
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(
      addAddress.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add address";
      }
    );
    // fetchAllAddress
    builder.addCase(fetchAllAddress.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchAllAddress.fulfilled,
      (state, action: PayloadAction<AddressApiResponse<Address[]>>) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
        state.error = null;
      }
    );
    builder.addCase(
      fetchAllAddress.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.addressList = [];
        state.error = action.payload || "Failed to fetch addresses";
      }
    );
    // editAddress
    builder.addCase(editAddress.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      editAddress.fulfilled,
      (state) => {
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(
      editAddress.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to edit address";
      }
    );
    // deleteAddress
    builder.addCase(deleteAddress.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteAddress.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(
      deleteAddress.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete address";
      }
    );
  },
});

export default ShoppingAddressSlice.reducer;
