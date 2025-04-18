import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../authSlice";
import { ProductDetails } from "@/pages/Shopping-view/ShoppingProductDetail";
import { Filters } from "@/pages/Shopping-view/ShoppingStore";

interface ProductState {
  isLoading: boolean;
  productList: ProductDetails[];
  productDetails: ProductDetails;
  error?: string;
}
enum Category {
  FRESH_FLOWERS = "FRESH_FLOWERS",
  BOUQUETS = "BOUQUETS",
  POTTED_PLANTS = "POTTED_PLANTS",
  DECORATION = "DECORATION",
}
enum EventType {
  WEDDING = "WEDDING",
  BIRTHDAY = "BIRTHDAY",
  FUNERAL = "FUNERAL",
  CHRISTMASS = "CHRISTMASS",
  VALENTINES = "VALENTINES",
  WOMENDAY = "WOMENDAY",
}
interface ApiResponse {
  success: boolean;
  message: string;
}
export interface fetchProductDetailsApiResponse extends ApiResponse {
  data: ProductDetails;
}
interface fetchAllFilteredProductsApiResponse {
  success: boolean;
  data: ProductDetails[];
}
interface fetchAllFilteredProductsData {
  filterParams: Filters;
  sortParams: string;
}
export const initalProductDetails =  {
  id: "",
  name: "",
  price: 0,
  stock: 0,
  image: "",
  saleprice: 0,
  description: "",
  category: Category.FRESH_FLOWERS,
  event: EventType.BIRTHDAY,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  averageReview: 0,
  reviews: [],
}
const initialState: ProductState = {
  isLoading: false,
  productList: [],
  productDetails: {
    id: "",
    name: "",
    price: 0,
    stock: 0,
    image: "",
    saleprice: 0,
    description: "",
    category: Category.FRESH_FLOWERS,
    event: EventType.BIRTHDAY,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    averageReview: 0,
    reviews: [],
  },
  error: "",
};
export const fetchAllFilteredProducts = createAsyncThunk<
  fetchAllFilteredProductsApiResponse,
  fetchAllFilteredProductsData
>(
  "/products/fetchAllFilteredProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    }).toString();

    const result = await axios.get(`${API_URL}shop/products/get?${query}`);
    return result.data;
  }
);

export const fetchProductDetails = createAsyncThunk<
  fetchProductDetailsApiResponse,
  string
>("/products/fetchProductDetails", async (id) => {
  const result = await axios.get(`${API_URL}shop/products/get/${id}`);
  return result.data;
});
const ShopProductSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export default ShopProductSlice.reducer;
