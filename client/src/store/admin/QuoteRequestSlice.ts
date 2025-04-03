import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_URL } from "../authSlice";
import {
  createQuoteRequestResponse,
  getQuoteApiResponse,
  getQuoteDetailApiResponse,
  QuoteRequest,
  QuoteState,
  QuoteStatus,
} from "../shop/QuoteRequestSlice";
interface updateQuotesRequestStatusProp {
  id: string;
  status: QuoteStatus;
  adminResponse: string;
}
interface adminQuoteState extends QuoteState {
  status: string;
}
const initialState: adminQuoteState = {
  isLoading: false,
  quoteRequestList: [] as QuoteRequest[],
  quoteRequestDetails: {} as QuoteRequest,
  error: undefined,
  status: "idle",
};

export const getAllQuotesofAllUsers = createAsyncThunk(
  "/quotes/getAllQuotesofAllUsers",
  async () => {
    try {
      const response = await axios.get(`${API_URL}admin/quotes/get`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return err.response?.data || "Error fetching Quotes of all users";
    }
  }
);

export const getQuotesDetailsForAdmin = createAsyncThunk<
  getQuoteDetailApiResponse,
  string,
  { rejectValue: string }
>("/quotes/getQuotesDetailsForAdmin", async (id) => {
  try {
    const result = await axios.get(`${API_URL}admin/quotes/details/${id}`);
    return result.data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data || "Error fetching Quotes Details";
  }
});

export const updateQuotesRequestStatus = createAsyncThunk<
  createQuoteRequestResponse,
  updateQuotesRequestStatusProp
>(
  "/quotes/updateQuotesRequestStatus",
  async ({ id, status, adminResponse }) => {
    try {
      const result = await axios.put(`${API_URL}admin/quotes/update/${id}`, {
        status,
        adminResponse,
      });
      return result.data;
    } catch (error) {
      const err = error as AxiosError;
      return err.response?.data || "Error updating Quotes Request Status";
    }
  }
);

const AdminQuoteRequestSlice = createSlice({
  name: "AdminQuoteRequestSlice",
  initialState,
  reducers: {
    resetQuoteRequestDetails: (state) => {
      state.quoteRequestDetails = {} as QuoteRequest;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuotesofAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllQuotesofAllUsers.fulfilled,
        (state, action: PayloadAction<getQuoteApiResponse>) => {
          state.isLoading = false;
          state.quoteRequestList = action.payload.data;
        }
      )
      .addCase(
        getAllQuotesofAllUsers.rejected,
        (state, action: PayloadAction<createQuoteRequestResponse>) => {
          state.isLoading = false;
          state.error = action.payload.error;
          state.quoteRequestList = [] as QuoteRequest[];
        }
      )
      .addCase(getQuotesDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getQuotesDetailsForAdmin.fulfilled,
        (state, action: PayloadAction<getQuoteDetailApiResponse>) => {
          state.isLoading = false;
          state.quoteRequestDetails = action.payload.data;
        }
      )
      .addCase(
        getQuotesDetailsForAdmin.rejected,
        (state, action: PayloadAction<createQuoteRequestResponse>) => {
          state.isLoading = false;
          state.error = action.payload.error;
          state.quoteRequestDetails = {} as QuoteRequest;
        }
      )
      .addCase(updateQuotesRequestStatus.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(updateQuotesRequestStatus.fulfilled, (state) => {
        state.isLoading = false;
        state.status = "succeeded";
      })
      .addCase(
        updateQuotesRequestStatus.rejected,
        (state, action: PayloadAction<createQuoteRequestResponse>) => {
          state.isLoading = false;
          state.status = "failed";
          state.error = action.payload.error;
          state.quoteRequestDetails = {} as QuoteRequest;
        }
      );
  },
});
export const { resetQuoteRequestDetails } = AdminQuoteRequestSlice.actions;
export default AdminQuoteRequestSlice.reducer;
