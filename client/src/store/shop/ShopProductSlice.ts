import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading:false,
    productList:[]   
}
export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllFilteredProducts",
    async ({ filterParams, sortParams }) => {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      }).toString();
  
      const result = await axios.get(
        `http://localhost:5000/api/shop/products/get?${query}`
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
    },
})
export default ShopProductSlice.reducer
