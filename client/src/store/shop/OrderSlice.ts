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
interface ApiResponse {
  success: boolean;
  message: string;
}
interface capturePaymentApiResponse extends ApiResponse {
  data: Order;
}
interface capturePaymentData {
  paymentId: string;
  payerId: string;
  orderId: string;
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
interface getAllOrdersByUserApiResponse extends ApiResponse {
  data: Order[];
}
interface createOrderApiResponse extends ApiResponse {
  approvalURL: string;
  orderId: string;
}
export interface orderData {
  userId: string;
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
const initialState = {
  approvalURL: "",
  isLoading: false,
  orderId: "",
  orderList: [] as Order[],
  orderDetails: {
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
  } as Order,
};

export const createNewOrder = createAsyncThunk<
  createOrderApiResponse,
  orderData
>("/order/createNewOrder", async (orderData) => {
  const result = await axios.post(`${API_URL}shop/order/create`, orderData);
  return result.data;
});
export const capturePayment = createAsyncThunk<
  capturePaymentApiResponse,
  capturePaymentData
>("/order/createNewOrder", async ({ paymentId, payerId, orderId }) => {
  const result = await axios.post(`${API_URL}shop/order/capture`, {
    paymentId,
    payerId,
    orderId,
  });
  return result.data;
});
export const getOrderDetails = createAsyncThunk<
  capturePaymentApiResponse,
  string
>("/order/getOrderDetails", async (id) => {
  const result = await axios.get(`${API_URL}shop/order/details/${id}`);
  return result.data;
});

export const getAllOrdersByUser = createAsyncThunk<
  getAllOrdersByUserApiResponse,
  string
>("/order/getAllOrdersByUser", async (userId) => {
  const result = await axios.get(`${API_URL}shop/order/list/${userId}`);
  return result.data;
});
const ShoppingORderSlice = createSlice({
  name: "ShoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
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
    },
  },
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
        state.approvalURL = "";
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
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
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
export const { resetOrderDetails } = ShoppingORderSlice.actions;
