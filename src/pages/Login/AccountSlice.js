import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "Account",
  initialState: localStorage.getItem("loginSuccess"),
  reducers: {
    // IMMER
    LogginSuccess: (state) => "true",
    Logout: (state) => "false",
  },
});
