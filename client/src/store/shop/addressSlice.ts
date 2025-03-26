import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// ---------------------
// Type Definitions
// ---------------------

export interface Address {
  id?: string;
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

export interface AddressApiResponse<T = any> {
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
>(
  "address/addAddress",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post<AddressApiResponse<Address>>(
        "http://localhost:5000/api/shop/adresss/add",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || "Error adding address");
    }
  }
);

export const fetchAllAddress = createAsyncThunk<
  AddressApiResponse<Address[]>,
  string,
  { rejectValue: string }
>(
  "address/fetchAllAddress",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get<AddressApiResponse<Address[]>>(
        `http://localhost:5000/api/shop/adresss/get/${userId}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || "Error fetching address");
    }
  }
);

export const editAddress = createAsyncThunk<
  AddressApiResponse<Address>,
  EditAddressPayload,
  { rejectValue: string }
>(
  "address/editAddress",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put<AddressApiResponse<Address>>(
        `http://localhost:5000/api/shop/adresss/update/${userId}/${addressId}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || "Error editing address");
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
      const response = await axios.delete<AddressApiResponse>(
        `http://localhost:5000/api/shop/adresss/delete/${userId}/${addressId}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || "Error deleting address");
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
      (state, action: PayloadAction<AddressApiResponse<Address>>) => {
        state.isLoading = false;
        // Append the new address to the list
        state.addressList = [...state.addressList, action.payload.data];
        state.error = null;
      }
    );
    builder.addCase(addAddress.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to add address";
    });
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
    builder.addCase(fetchAllAddress.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.addressList = [];
      state.error = action.payload || "Failed to fetch addresses";
    });
    // editAddress
    builder.addCase(editAddress.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      editAddress.fulfilled,
      (state, action: PayloadAction<AddressApiResponse<Address>>) => {
        state.isLoading = false;
        state.error = null;
        state.addressList = state.addressList.map((address) => {
          if (address._id === action.payload.data._id) {
            return action.payload.data;
          }
          return address;
        })
    });
    builder.addCase(editAddress.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to edit address";
    });
    // deleteAddress
    builder.addCase(deleteAddress.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteAddress.fulfilled, (state) => {
      state.isLoading = false;
     state.error = null;  });
    builder.addCase(deleteAddress.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to delete address";
    });
  },
});

export default ShoppingAddressSlice.reducer;
