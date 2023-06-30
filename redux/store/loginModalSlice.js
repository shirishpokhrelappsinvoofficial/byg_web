import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const LoginSlice = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    loginModalHandler: (state, action) => {
      state.value = action?.payload ? action?.payload : !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginModalHandler } = LoginSlice.actions;

export default LoginSlice.reducer;
