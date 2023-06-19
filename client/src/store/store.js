import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "../features/userauthSlice";

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: [
    "userReducer",    
  ],
};

const rootReducer = combineReducers({
  user: userReducer,  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore(persistedReducer);