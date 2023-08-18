import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },

    logout: (state, action) => {
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
