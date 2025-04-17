import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../authSlice";

interface addProductReviewData {
  productId: string;
  userId: string;
  content: string;
  rating: number;
  userName: string;
}
interface ApiResponse {
  success: boolean;
  message: string;
}
interface productReview extends addProductReviewData {
  id: string;
  createdAt: string;
  updatedAt: string;
}
interface addProductReviewApiResponse extends ApiResponse {
  data: productReview;
}
export const getProductReview = createAsyncThunk(
  "/productReview/getProductReview",
  async (productId: string) => {
    const result = await axios.get(`${API_URL}shop/review/get/${productId}`);
    return result.data;
  }
);
export const addProductReview = createAsyncThunk<
  addProductReviewApiResponse,
  addProductReviewData
>(
  "/productReview/addProductReview",
  async ({ productId, userId, content, rating, userName }) => {
    const result = await axios.post(`${API_URL}shop/review/add`, {
      productId,
      userId,
      content,
      rating,
      userName,
    });
    return result.data;
  }
);
interface initialStateProps{
  isLoading:boolean;
  productReviews:productReview[];
  error:string;
}
const initialState:initialStateProps = {
  isLoading: false,
  productReviews: [],
  error: "",
}
const ProductReviewSlice = createSlice({
  name: "ProductReviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productReviews = action.payload.data;
      })
      .addCase(getProductReview.rejected, (state) => {
        state.isLoading = false;
        state.productReviews = [];
        state.error = "Error while getting product review";
      });
  },
});

export default ProductReviewSlice.reducer;
