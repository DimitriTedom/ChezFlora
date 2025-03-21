// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Importation du reducer d'authentification depuis le bon dossier
import  imageUploadReducer  from "./imageUploadSlice";
import AdminProductSlice from './ProductSlice'
import ShopProductSlice from './shop/ShopProductSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    imageUpload:imageUploadReducer,
    adminProducts: AdminProductSlice,
    shopProducts:ShopProductSlice,
  },
});

// Types Redux pour TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
