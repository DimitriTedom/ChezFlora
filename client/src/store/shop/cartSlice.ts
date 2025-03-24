import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

export interface CartItem{
    id:string;
    cartId:string;
    productId:string;
    quantity:number;
    product?:{
        id:string;
        name:string;
        price:number;
        saleprice?:number;
        image:string;
    };
}

interface AddToCartPayload{
    userId:string;
    productId:string;
    quantity:number;
}
interface UpdateCartQtyPayload{
    userId:string;
    productId:string;
    quantity:number;
}
interface DeleteCartItemsPayload{
    userId:string;
    productId:string;
}
export interface CartState{
    cartItems:CartItem[] | null;
    isLoading:boolean;
    error?:string;
}
const initialState: CartState = {
    cartItems: null,
    isLoading: false,
    error: undefined,
  };

  //Asynchronous Thunks :

export const addToCart = createAsyncThunk('cart/addToCart',
    async  ({userId,productId,quantity}:AddToCartPayload,{rejectWithValue}) =>{
       try {
        const response = await axios.post('http://localhost:5000/api/shop/cart/addtocart',{userId,productId,quantity});
        return response.data;
       } catch (error:any) {
        return rejectWithValue(error.response?.data || "Error adding to cart")
       }
    }
)
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems',
    async  (userId:string,{rejectWithValue}) =>{
        try {
            const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`);
            return response.data     
        } catch (error:any) {
            return rejectWithValue(error.response?.data || "Error fetching cart items");
        }
    }
);
export const updateCartIemQty = createAsyncThunk('cart/updateCartIemQty',
    async  ({userId,productId,quantity}:UpdateCartQtyPayload,{rejectWithValue}) =>{
        try {
            const response = await axios.put('http://localhost:5000/api/shop/cart/update-cart',{userId,productId,quantity});
            return response.data
        } catch (error:any) {
            return rejectWithValue(error.response?.data || "Error updating cart Item quantity")
        }
    }
)
export const deleteCartITems = createAsyncThunk('cart/deleteCartITems',
    async  ({userId,productId}:DeleteCartItemsPayload,{rejectWithValue}) =>{
        try {
            const response = await axios.delete(`http://localhost:5000/api/shop/cart/${userId}/${productId}`);
            return response.data
        } catch (error:any) {
            return rejectWithValue(error.response?.data || "Error deleting cart item");
        }
    }
);

// Create Slice

const ShoppingCartSlice = createSlice({
    name:'shoppingCart',
    initialState,
    reducers:{},
    extraReducers : (builder) => {
        builder.addCase(addToCart.pending,(state)=>{
            state.isLoading = true
            state.error = undefined
        }).addCase(addToCart.fulfilled,(state,action:PayloadAction<any>)=>{
            state.isLoading = false
            state.cartItems = action.payload?.data
        }).addCase(addToCart.rejected,(state,action:PayloadAction<any>)=>{
            state.isLoading = false
            // state.cartItems = []
            state.error = action.payload;
        })
        
        .addCase(fetchCartItems.pending,(state)=>{
            state.isLoading = true
            state.error= undefined;
        }).addCase(fetchCartItems.fulfilled,(state,action:PayloadAction<any>)=>{
            state.isLoading = false;
            console.log(action)
            state.cartItems = action.payload?.data
        }).addCase(fetchCartItems.rejected,(state,action:PayloadAction<any>)=>{
            state.isLoading = false
            state.cartItems = []
            state.error = action.payload
        })
        
        .addCase(updateCartIemQty.pending,(state)=>{
            state.isLoading = true
        }).addCase(updateCartIemQty.fulfilled,(state,action:PayloadAction<any>)=>{
            state.isLoading = false
            console.log(action)
            state.cartItems = action.payload?.data
        }).addCase(updateCartIemQty.rejected,(state,action:PayloadAction<any>)=>{
            state.isLoading = false
            state.cartItems = []
            state.error = action.payload;
        })
        
        .addCase(deleteCartITems.pending,(state)=>{
            state.isLoading = true
        }).addCase(deleteCartITems.fulfilled,(state,action:PayloadAction<any>)=>{
            state.isLoading = false
            state.cartItems = action.payload?.data
        }).addCase(deleteCartITems.rejected,(state,action:PayloadAction<any>)=>{
            state.isLoading = false
            state.error = action.payload
        })
    },
})
export default ShoppingCartSlice.reducer