import { createSelector } from "@reduxjs/toolkit";

export const cartSelector = (state) => state.Cart;
export const loginSuccess = (state) => state.Account;

export const quantityItem = createSelector(cartSelector, (state) => {
  if (state.length === 0) {
    return 0;
  } else {
    let result = 0;
    state.forEach((item) => {
      result += item.quantity;
    });
    return result;
  }
});

export const getAllItemFromCart = createSelector(cartSelector, (state) => {
  return state;
});

export const getLoginSuccess = createSelector(loginSuccess, (state) => {
  return state;
});
