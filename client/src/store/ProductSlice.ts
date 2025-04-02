import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./authSlice";

const initialState = {
  isLoading: false,
  productList: [],
};
 export const addNewProduct = createAsyncThunk("/products/addNewProduct", 
   async (formData,{rejectWithValue}) => {
    try{
      const result = await axios.post(
        `${API_URL}admin/products/add`,
        formData,{
            headers:{
                'Content-Type' :'application/json'
            },
        }
      );
      return result?.data
    }catch (error:any) {
      return rejectWithValue(error.response.data);
    }
});

export const fetchAllProducts = createAsyncThunk("/products/fetchAllProducts", 
    async () => {
   const result = await axios.get(
     `${API_URL}admin/products/get`,
   );
   return result?.data
 });

export const editProduct = createAsyncThunk("/products/editProduct", 
    async ({id,formData}) => {
   const result = await axios.put(
     `${API_URL}admin/products/edit/${id}`,
     formData,{
         headers:{
             'Content-Type' :'application/json'
         },
     }
   );
   return result?.data
 });

 export const deleteProduct = createAsyncThunk("/products/deleteProduct", 
    async (id) => {
   const result = await axios.delete(
     `${API_URL}admin/products/delete/${id}`,

   );
   return result?.data
 });


const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder      
    // Fetch all products
    .addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
      // console.log(action.payload.data)
      state.isLoading = false;
      state.productList = action.payload.data;
    })
    .addCase(fetchAllProducts.rejected, (state) => {
      state.isLoading = false;
      state.productList = [];
    })
  },
});

export default AdminProductSlice.reducer