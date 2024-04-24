import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.data;
      state.token = action.payload.token.token;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = "";
    },
    registerSuccess: (state, action) => {
      state.user = action.payload.data;
      state.token = action.payload.token.token;
    },
  },
});

export const { loginSuccess, logoutSuccess, registerSuccess } =
  authSlice.actions;
export default authSlice.reducer;
