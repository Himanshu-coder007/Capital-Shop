import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../components/Cart/CartSlice";
import AccountSlice from "../pages/Login/AccountSlice";

const store = configureStore({
  reducer: {
    Cart: CartSlice.reducer,
    Account: AccountSlice.reducer,
  },
});

export default store;
