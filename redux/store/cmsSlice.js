import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "@/services/httphandler";

const initialState = {
  isLoading: false,
  contactus: "",
  tnc: "",
  refund: "",
  cancellationPolicy: "",
  privacy: "",
  contactNumber: "",
  aboutUs: "",
  shippingDelivery: ""
};

export const contactUs = (state) => state.cms.contactus?.contactUs;
export const tnc = (state) => state.cms.tnc?.tnc;
export const privacy = (state) => state.cms.privacy?.privacy;
export const cancellationPolicy = (state) =>
  state.cms.cancellationPolicy?.cancellationPolicy;
export const refund = (state) => state.cms.refund?.refund;
export const aboutUs = (state) => state.cms.aboutUs
export const shippingDelivery = (state) => state.cms.shippingDelivery
export const contact = (state) => state.cms.contactNumber?.contactNumber;

export const getContactUs = createAsyncThunk("contact-us", async () => {
  let response = await getData("cms/getContactUs");
  return response.data;
});
export const getAboutUs = createAsyncThunk("aboutUs", async () => {
  let response = await getData("cms/aboutUs");
  return response.data;
});

export const getTnc = createAsyncThunk("getTnc", async () => {
  let response = await getData("cms/getTnc");
  return response.data;
});

export const getShippingPolicy = createAsyncThunk("getShippingPolicy", async () => {
  let response = await getData("cms/getShippingPolicy");
  return response.data;
});

export const getCancellationPolicy = createAsyncThunk(
  "getCancellationPolicy",
  async () => {
    let response = await getData("cms/getCancellationPolicy");
    return response.data;
  }
);

export const getPrivacy = createAsyncThunk("getPrivacy", async () => {
  let response = await getData("cms/getPrivacy");
  return response.data;
});

export const getContactNumber = createAsyncThunk(
  "getContactNumber",
  async () => {
    let response = await getData("cms/getContactNumber");
    return response.data;
  }
);

const cmsSlice = createSlice({
  name: "cms",
  initialState,
  extraReducers: {
    [getAboutUs.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.aboutUs = action.payload;
    },
    [getContactUs.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.contactus = action.payload;
    },
    [getTnc.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.tnc = action.payload;
    },
    [getShippingPolicy.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.shippingDelivery = action.payload;
    },
    [getCancellationPolicy.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cancellationPolicy = action.payload;
    },
    [getPrivacy.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.privacy = action.payload;
    },
    [getContactNumber.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.contactNumber = action.payload;
    },
  },
});

export default cmsSlice.reducer;
