"use client";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/components/loginmodal/userSlice";
import addressSlice from "@/redux/store/addressSlice";
import cartSlice from "@/redux/store/cartSlice";
import citySlice from "@/redux/store/citySlice";
import homepageSlice from "@/redux/store/homepageSlice";
import bannerSlice from "./bannerSlice";
import categoryReducer from "./categorySlice";
import cmsSlice from "./cmsSlice";
import LoginSliceReducer from "./loginModalSlice";
import occasionSlice from "./occasionSlice";
import OtpSliceReducer from "./otpModalSlice";
import profileSliceReducer from "./profileModalSlice";
import prouductReducer from "./prouductSlice";
import relationSlice from "./relationSlice";

export const store = configureStore({
  reducer: {
    loginReducer: LoginSliceReducer,
    otp: OtpSliceReducer,
    profile: profileSliceReducer,
    user: userReducer,
    category: categoryReducer,
    product: prouductReducer,
    cart: cartSlice,
    city: citySlice,
    address: addressSlice,
    occasion: occasionSlice,
    relation: relationSlice,
    banner: bannerSlice,
    homePage: homepageSlice,
    cms: cmsSlice,
  },
});
