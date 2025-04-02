import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../authSlice";

const initialState = {
    isLoading:false,
    productList:[],
    productDetails:null,
    error:null,
}
export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllFilteredProducts",
    async ({ filterParams, sortParams }) => {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      }).toString();
  
      const result = await axios.get(
        `${API_URL}shop/products/get?${query}`
      );
      return result.data;
    }
  );

  export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {
  
      const result = await axios.get(
        `${API_URL}shop/products/get/${id}`
      );
      return result.data;
    }
  );
const ShopProductSlice = createSlice({
    name: 'shopProducts',
    initialState,
    reducers:{},
    extraReducers : (builder)=> {
        builder.addCase(fetchAllFilteredProducts.pending, (state,action)=>{
            state.isLoading = true

        }).addCase(fetchAllFilteredProducts.fulfilled, (state,action)=>{
            state.isLoading = false
            state.productList= action.payload.data
        }).addCase(fetchAllFilteredProducts.rejected, (state,action)=>{
            console.log(action.payload);
            state.isLoading = false
            state.productList= []
        })
        .addCase(fetchProductDetails.pending, (state,action)=>{
          state.isLoading = true
          state.error = null;
      }).addCase(fetchProductDetails.fulfilled, (state,action)=>{
          state.isLoading = false
          state.productDetails= action.payload.data
      }).addCase(fetchProductDetails.rejected, (state,action)=>{
          console.log(action.payload);
          state.isLoading = false
      });
    },
})
export default ShopProductSlice.reducer
