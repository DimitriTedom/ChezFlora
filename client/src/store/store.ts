// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Importation du reducer d'authentification depuis le bon dossier
import  imageUploadReducer  from "./imageUploadSlice";
import AdminProductSlice from './ProductSlice'
import ShopProductSlice from './shop/ShopProductSlice'
import ShoppingCartSlice from "./shop/cartSlice";
import ShoppingAddressSlice from "./shop/addressSlice";
import ShoppingORderSlice from "./shop/OrderSlice"
import adminOrderSlice from "./admin/OrderSlice"
import searchProductSlice from "./shop/SearchProductsSlice"
import ProductReviewSlice from "./shop/ProductReviewSlice"
import contactSlice from "./shop/ContactSlice"
import ShoppingQuoteSlice from "./shop/QuoteRequestSlice"
import AdminQuoteRequestSlice from './admin/QuoteRequestSlice'
import adminUserSlice from './admin/UserSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    imageUpload:imageUploadReducer,
    adminProducts: AdminProductSlice,
    shopProducts:ShopProductSlice,
    shoppingCart:ShoppingCartSlice,
    address:ShoppingAddressSlice,
    shopOrder:ShoppingORderSlice,
    adminOrder:adminOrderSlice,
    searchPrdouct:searchProductSlice,
    shopProductReview:ProductReviewSlice,
    shopContact:contactSlice,
    shopQuoteRequest:ShoppingQuoteSlice,
    adminQuoteRequest:AdminQuoteRequestSlice,
    adminUsers:adminUserSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
