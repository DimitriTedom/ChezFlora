import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../authSlice";

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
interface ApiResponse{
  success:boolean;
  message:string;
}
interface getOrderDetailsForAdmin extends ApiResponse{
  data: Order;
}
interface updateOrderStatusData{
  id:string;
  orderStatus:string;
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
interface AdminOrderState {
  orderDetails: Order;
  orderList: Order[];
  isLoading: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
interface Order {
  id: string;
  userId: string | undefined;
  cartId: string;
  cartItems: CartItemDetails[];
  addressInfo: AddressInfo;
  orderStatus: OrderStatus;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  orderDate: string;
  orderUpdateDate: string;
  paymentId?: string;
  payerId?: string;
}

const initialState:AdminOrderState = {
  orderDetails: {
    id: "",
    userId: undefined,
    cartId: "",
    cartItems: [],
    addressInfo: {
      addressId: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
      notes: "",
    },
    orderStatus: OrderStatus.PENDING, 
    paymentMethod: "",
    paymentStatus: PaymentStatus.PENDING,
    totalAmount: 0,
    orderDate: new Date().toISOString(),
    orderUpdateDate: new Date().toISOString(),
    paymentId: undefined,
    payerId: undefined,
  },
  orderList: [],
  isLoading: false,
  error: null,
  status: 'idle',
}; 
export const getOrderDetailsForAdmin = createAsyncThunk<getOrderDetailsForAdmin,string>(
  "/orders/getOrderDetailsForAdmin",
  async (id) => {
    const result = await axios.get(
      `${API_URL}admin/orders/details/${id}`
    );
    return result.data;
  }
);

export const getAllOrdersofAllUsers = createAsyncThunk(
  "/orders/getAllOrdersofAllUsers",
  async () => {
    const result = await axios.get(
      `${API_URL}admin/orders/get/`
    );
    return result.data;
  }
);

export const updateOrderStatus = createAsyncThunk<ApiResponse,updateOrderStatusData>(
  "/orders/updateOrderStatus",
  async ({id,orderStatus}) => {
    const result = await axios.put(
      `${API_URL}admin/orders/update/${id}`,{orderStatus}
    );
    return result.data;
  }
);
const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers:  {
      resetOrderDetails:(state)=>{
        state.orderDetails = {
          id: "",
          userId: undefined,
          cartId: "",
          cartItems: [] as CartItemDetails[], 
          addressInfo: {
            addressId: "",
            address: "",
            city: "",
            postalCode: "",
            phone: "",
            notes: "",
          } as AddressInfo,
          orderStatus: OrderStatus.PENDING,
          paymentMethod: "",
          paymentStatus: PaymentStatus.PENDING, 
          totalAmount: 0,
          orderDate: new Date().toISOString(),
          orderUpdateDate: new Date().toISOString(), 
          paymentId: undefined,
          payerId: undefined,
        } as Order
      }
    },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = {
            id: "",
            userId: undefined,
            cartId: "",
            cartItems: [] as CartItemDetails[], 
            addressInfo: {
              addressId: "",
              address: "",
              city: "",
              postalCode: "",
              phone: "",
              notes: "",
            } as AddressInfo,
            orderStatus: OrderStatus.PENDING,
            paymentMethod: "",
            paymentStatus: PaymentStatus.PENDING, 
            totalAmount: 0,
            orderDate: new Date().toISOString(),
            orderUpdateDate: new Date().toISOString(), 
            paymentId: undefined,
            payerId: undefined,
          } as Order;
      })
      .addCase(getAllOrdersofAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersofAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action,"action");

        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersofAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || "Failed to update order status";
      });
  },
});

export const {resetOrderDetails} = adminOrderSlice.actions
export default adminOrderSlice.reducer;
