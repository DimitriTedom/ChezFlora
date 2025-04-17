import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./authSlice";
import { ProductFormData } from "@/pages/admin-view/Products";

const initialState = {
  isLoading: false,
  productList: [],
};

interface AddNewProductApiResponse{
  success: boolean;
  data:ProductFormData;
}
interface EditProductData{
  id:string;
  formData:ProductFormData;
}
interface ApiResponse{
  success:boolean;
  message:string;
}
interface EditProductApiResponse extends ApiResponse{
  data:ProductFormData;
}

 export const addNewProduct = createAsyncThunk<AddNewProductApiResponse,ProductFormData>("/products/addNewProduct", 
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
    }catch (error:unknown) {
      if(axios.isAxiosError(error)){
        return rejectWithValue(error?.response?.data || "Addintion of product failed");
      }
    }
});

export const fetchAllProducts = createAsyncThunk("/products/fetchAllProducts", 
    async () => {
   const result = await axios.get(
     `${API_URL}admin/products/get`,
   );
   return result?.data
 });

export const editProduct = createAsyncThunk<EditProductApiResponse,EditProductData>("/products/editProduct", 
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

 export const deleteProduct = createAsyncThunk<ApiResponse,string>("/products/deleteProduct", 
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
    .addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
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