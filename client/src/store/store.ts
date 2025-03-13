// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Importation du reducer d'authentification depuis le bon dossier
import cartSlice from './cartSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart:cartSlice,
  },
});

// Types Redux pour TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
