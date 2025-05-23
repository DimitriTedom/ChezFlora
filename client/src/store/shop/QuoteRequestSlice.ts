import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../authSlice";

// -----------------
// Define Interfaces
// -----------------

export enum EventType {
  WEDDING = "WEDDING",
  BIRTHDAY = "BIRTHDAY",
  FUNERAL = "FUNERAL",
  CHRISTMASS = "CHRISTMASS",
  VALENTINES = "VALENTINES",
  WOMENDAY = "WOMENDAY",
}
export enum QuoteStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  CANCELLED = "CANCELLED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
export interface createQuoteRequestResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface QuoteRequest {
  id: string;
  userId: string | undefined;
  eventDate: string;
  eventType: EventType;
  adminResponse?: string;
  estimatedBudget: number;
  description: string;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
}

export interface clientQuoteRequestFormData extends QuoteRequestFormData {
  userId: string | undefined;
}

export interface QuoteRequestFormData {
  eventDate: string;
  eventType: EventType | string;
  estimatedBudget: number;
  description: string;
}

export interface QuoteState {
  isLoading: boolean;
  quoteRequestList: QuoteRequest[] | null;
  quoteRequestDetails: QuoteRequest;
  error?: string;
}

export interface getQuoteApiResponse {
  success: boolean;
  message: string;
  data: QuoteState["quoteRequestList"];
}

export interface getQuoteDetailApiResponse {
  success: boolean;
  message: string;
  data: QuoteState["quoteRequestDetails"];
}
// --------------------------
// Initial State Declaration
// --------------------------

const initialState: QuoteState = {
  isLoading: false,
  quoteRequestList: [] as QuoteRequest[],
  quoteRequestDetails: {} as QuoteRequest,
  error: undefined,
};

// ----------------------
// Asynchronous Thunks
// ----------------------

export const createQuoteRequest = createAsyncThunk<
  createQuoteRequestResponse,
  clientQuoteRequestFormData,
  { rejectValue: string }
>("quote/createQuoteRequest", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}shop/quote/add`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to send issue"
      );
    }
  }
});

export const fetchAllQuoteRequests = createAsyncThunk<
  getQuoteApiResponse,
  string,
  { rejectValue: string }
>("quote/fetchAllQuoteRequests", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}shop/quote/get/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data || "Error fetching cart items"
      );
    }
  }
});

export const getQuoteRequestDetail = createAsyncThunk<
  getQuoteDetailApiResponse,
  string,
  { rejectValue: string }
>("/quote/getQuoteRequestDetail", async (id) => {
  const result = await axios.get<getQuoteDetailApiResponse>(
    `${API_URL}shop/quote/details/${id}`
  );
  return result.data;
});
const ShoppingQuoteSlice = createSlice({
  name: "ShoppingQuoteSlice",
  initialState,
  reducers: {
    resetQuoteRequestDetails: (state) => {
      state.quoteRequestDetails = {} as QuoteRequest;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuoteRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuoteRequest.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createQuoteRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllQuoteRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAllQuoteRequests.fulfilled,
        (state, action: PayloadAction<getQuoteApiResponse>) => {
          state.isLoading = false;
          state.quoteRequestList = action.payload.data;
        }
      )
      .addCase(fetchAllQuoteRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getQuoteRequestDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getQuoteRequestDetail.fulfilled,
        (state, action: PayloadAction<getQuoteDetailApiResponse>) => {
          state.isLoading = false;
          state.quoteRequestDetails = action.payload.data;
        }
      )
      .addCase(getQuoteRequestDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export default ShoppingQuoteSlice.reducer;
export const { resetQuoteRequestDetails } = ShoppingQuoteSlice.actions;
