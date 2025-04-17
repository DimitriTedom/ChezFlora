import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../authSlice";

// -----------------
// Define Interfaces
// -----------------

export interface Product {
  id: string;
  name: string;
  price: number;
  saleprice?: number;
  image: string;
  stock: number;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface CartState {
  cartItems: CartItem[] | null;
  isLoading: boolean;
  error?: string;
}

// Payload interfaces for thunks
export interface AddToCartPayload {
  userId: string;
  productId: string;
  quantity: number;
}

export interface UpdateCartQtyPayload {
  userId: string;
  productId: string;
  quantity: number;
}

export interface DeleteCartItemsPayload {
  userId: string;
  productId: string;
}

export interface CartApiResponse {
  success: boolean;
  message: string;
  data: CartState["cartItems"];
}

// --------------------------
// Initial State Declaration
// --------------------------
const initialState: CartState = {
  cartItems: null,
  isLoading: false,
  error: undefined,
};

// ----------------------
// Asynchronous Thunks
// ----------------------

export const addToCart = createAsyncThunk<
  CartApiResponse, 
  AddToCartPayload,
  { rejectValue: string }
>(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}shop/cart/addtocart`,
        { userId, productId, quantity }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Error adding to cart");
      }
    }
  }
);

export const fetchCartItems = createAsyncThunk<
  CartApiResponse,
  string, // userId
  { rejectValue: string }
>(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}shop/cart/get/${userId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Error fetching cart items");
      }
    }
  }
);

export const updateCartIemQty = createAsyncThunk<
  CartApiResponse,
  UpdateCartQtyPayload,
  { rejectValue: string }
>(
  "cart/updateCartIemQty",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}shop/cart/update-cart`,
        { userId, productId, quantity }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Error updating cart item quantity");
      }
    }
  }
);

export const deleteCartITems = createAsyncThunk<
  CartApiResponse,
  DeleteCartItemsPayload,
  { rejectValue: string }
>(
  "cart/deleteCartITems",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}shop/cart/${userId}/${productId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Error deleting cart item");
      }
    }
  }
);

// ----------------------
// Create Redux Slice
// ----------------------
const ShoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // addToCart
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(
      addToCart.fulfilled,
      (state, action: PayloadAction<CartApiResponse>) => {
        state.isLoading = false;
        state.cartItems = action.payload?.data || state.cartItems;
      }
    );
    builder.addCase(
      addToCart.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // fetchCartItems
    builder.addCase(fetchCartItems.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(
      fetchCartItems.fulfilled,
      (state, action: PayloadAction<CartApiResponse>) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      }
    );
    builder.addCase(
      fetchCartItems.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.cartItems = [];
        state.error = action.payload;
      }
    );

    // updateCartIemQty
    builder.addCase(updateCartIemQty.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(
      updateCartIemQty.fulfilled,
      (state, action: PayloadAction<CartApiResponse>) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      }
    );
    builder.addCase(
      updateCartIemQty.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.cartItems = [];
        state.error = action.payload;
      }
    );

    // deleteCartITems
    builder.addCase(deleteCartITems.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(
      deleteCartITems.fulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addCase(
      deleteCartITems.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export default ShoppingCartSlice.reducer;
