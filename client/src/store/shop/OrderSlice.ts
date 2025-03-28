import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CartItemDetails {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface AddressInfo {
  addressId: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  notes?: string;
}

enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

interface Order {
  id:string;
  userId: string | undefined;
  cartId: string;
  cartItems: CartItemDetails[];
  addressInfo: AddressInfo;
  orderStatus: OrderStatus;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  orderDate: Date;
  orderUpdateDate: Date;
  paymentId?: string;
  payerId?: string;
}

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: "",
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const result = await axios.post(
      "http://localhost:5000/api/shop/order/create",
      orderData
    );
    return result.data;
  }
);
export const capturePayment = createAsyncThunk(
  "/order/createNewOrder",
  async ({ paymentId, payerId, orderId }) => {
    const result = await axios.post(
      "http://localhost:5000/api/shop/order/capture",
      { paymentId, payerId, orderId }
    );
    return result.data;
  }
);
export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/order/details/${id}`
    );
    return result.data;
  }
);

export const getAllOrdersByUser = createAsyncThunk(
  "/order/getAllOrdersByUser",
  async (userId) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/order/list/${userId}`
    );
    return result.data;
  }
);
const ShoppingORderSlice = createSlice({
  name: "ShoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = "";
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      });
  },
});

export default ShoppingORderSlice.reducer;
export type { CartItemDetails, AddressInfo, Order };
export { OrderStatus, PaymentStatus };
