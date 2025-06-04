import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export default createSlice({
  name: "cart",
  initialState,
  reducers: {
    // IMMER
    addCart: (state, action) => {
      const temp = state.find((item) => item.id === action.payload.id);
      if (!temp) {
        state.push(action.payload);
      } else {
        let index = state.findIndex((item) => item.id === action.payload.id);
        state[index].quantity += action.payload.quantity;
      }
    },
    delCart: (state, action) => {
      let index = state.findIndex((item) => item.id === action.payload.id);
      if (state[index].quantity === 1) {
        state.splice(index, 1);
      } else {
        state[index].quantity -= 1;
      }
    },
    checkout: (state) => [],
  },
});