import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import CartSlice from "../components/Cart/CartSlice";
import AccountSlice from "../pages/Login/AccountSlice";

// Combine reducers
const rootReducer = combineReducers({
  Cart: CartSlice.reducer,
  Account: AccountSlice.reducer,
});

// Configure store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
