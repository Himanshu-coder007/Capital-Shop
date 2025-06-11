import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export default createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart or increase quantity if already exists
    addCart: (state, action) => {
      const temp = state.find((item) => item.id === action.payload.id);
      if (!temp) {
        state.push(action.payload);
      } else {
        let index = state.findIndex((item) => item.id === action.payload.id);
        state[index].quantity += action.payload.quantity;
      }
    },
    // Decrease quantity or remove item if quantity becomes 0
    delCart: (state, action) => {
      let index = state.findIndex((item) => item.id === action.payload.id);
      if (state[index].quantity === 1) {
        state.splice(index, 1);
      } else {
        state[index].quantity -= 1;
      }
    },
    // Remove item completely from cart
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    // Clear cart (checkout)
    checkout: (state) => {
      return [];
    },
  },
});