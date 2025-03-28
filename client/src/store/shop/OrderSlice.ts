import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    approvalURL:null,
    isLoading : false,
    orderId: ''
}

export const  createNewOrder = createAsyncThunk(
    "/order/createNewOrder",
    async (orderData) => {
  
      const result = await axios.post(
        'http://localhost:5000/api/shop/order/create',orderData
      );
      return result.data;
    }
  );
  export const  capturePayment = createAsyncThunk(
    "/order/createNewOrder",
    async ({paymentId, payerId, orderId}) => {
  
      const result = await axios.post(
        'http://localhost:5000/api/shop/order/capture',{paymentId, payerId, orderId}
      );
      return result.data;
    }
  );
const ShoppingORderSlice = createSlice({
    name: 'ShoppingOrderSlice',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(createNewOrder.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createNewOrder.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.approvalURL = action.payload.approvalURL;
            state.orderId = action.payload.orderId;
            sessionStorage.setItem("currentOrderId",JSON.stringify(action.payload.orderId));
        })
        .addCase(createNewOrder.rejected, (state)=>{
            state.isLoading = false
            state.approvalURL = null
            state.orderId= ''
        })
    },
})

export default ShoppingORderSlice.reducer