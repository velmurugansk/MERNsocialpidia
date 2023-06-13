import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/userauthSlice";

export const store = configureStore({
  reducer: {
    user:userReducer,
  },
})