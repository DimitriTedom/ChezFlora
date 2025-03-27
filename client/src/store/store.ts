// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Importation du reducer d'authentification depuis le bon dossier
import  imageUploadReducer  from "./imageUploadSlice";
import AdminProductSlice from './ProductSlice'
import ShopProductSlice from './shop/ShopProductSlice'
import ShoppingCartSlice from "./shop/cartSlice";
import ShoppingAddressSlice from "./shop/addressSlice";
import ShoppingORderSlice from "./shop/OrderSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    imageUpload:imageUploadReducer,
    adminProducts: AdminProductSlice,
    shopProducts:ShopProductSlice,
    shoppingCart:ShoppingCartSlice,
    address:ShoppingAddressSlice,
    shopOrder:ShoppingORderSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
