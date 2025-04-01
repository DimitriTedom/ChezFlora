import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductReview = createAsyncThunk(
    "/productReview/getProductReview",
    async (productId:string) => {
      const result = await axios.get(
        `http://localhost:5000/api/shop/review/get/${productId}`
      );
      return result.data;
    }
  );
  export const addProductReview = createAsyncThunk(
    "/productReview/addProductReview",
    async ({productId,userId,content,rating,userName}) => {
      const result = await axios.post(
        "http://localhost:5000/api/shop/review/add",{productId,userId,content,rating,userName}
      );
      return result.data;
    }
  );
const ProductReviewSlice = createSlice({
    name: "ProductReviewSlice",
    initialState: {
        isLoading: false,
        productReviews: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductReview.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productReviews = action.payload.data;
            })
            .addCase(getProductReview.rejected, (state, action) => {
                state.isLoading = false;
                state.productReviews = []
                state.error = action.payload;
            });
    },
});

export default ProductReviewSlice.reducer