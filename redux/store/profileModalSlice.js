"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  isLoggedIn:
    typeof window === "undefined"
      ? false
      : typeof window !== "undefined" &&
        localStorage.getItem("bookyourgift-token")
      ? localStorage.getItem("bookyourgift-token")
      : false,
};

export const profileSlice = createSlice({
  name: "profileModal",
  initialState,
  reducers: {
    profileModalHandler: (state) => {
      state.value = !state.value;
    },
    updateIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { profileModalHandler, updateIsLoggedIn } = profileSlice.actions;

export default profileSlice.reducer;
