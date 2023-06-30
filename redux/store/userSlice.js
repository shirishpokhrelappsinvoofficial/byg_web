import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getData,
  postFormData,
  postFormDataWithToken,
  postRawData,
  putEncodedData,
} from "../../services/httphandler";

const initialState = {
  isLoading: false,
  user: "",
  userdetails: "",
  order: "",
  orderdetails: "",
  purchaseOrders: "",
};

export const user = (state) => state.user.userdetails?.user;
export const orders = (state) => state.user.order?.orders?.data;
export const totalOrder = (state) => state.user.order?.orders?.total;
export const orderdetail = (state) => state.user.orderdetails;

export const updateProfile = createAsyncThunk(
  "update/profile",
  async (object, { dispatch }) => {
    let response = await postFormDataWithToken("profile", object);
    if (response && response.response_code === 200) {
      return response;
    }
  }
);

export const getUser = createAsyncThunk("get/profile", async () => {
  try {
    let response = await getData("getProfile");
    return response.data;
  } catch (error) {
    console.log(error?.message);
  }
});

export const getOrders = createAsyncThunk(
  "get/orders",
  async (object = { page: 1, limit: "1000" }) => {
    let response = await getData("order/myOrder", object);
    return response.data;
  }
);

export const userPurchase = createAsyncThunk("get/purchase", async () => {
  let response = await getData("recentPurchase");
  return response.data;
});

export const orderDetail = createAsyncThunk("order/details", async (object) => {
  let response = await getData("order/myOrderDetail", object);
  return response.data;
});

export const userCount = createAsyncThunk("viewers", async () => {
  let response = await postRawData("viewers");
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userdetails = "";
      state.purchaseOrders = "";
    },
    addUserData: (state, action) => {
      state.userdetails = action.payload.user;
      state.puchaseOrders = action.payload.recent;
    },
  },
  extraReducers: {
    [updateProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userdetails = action.payload;
    },
    [getOrders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
    },
    [orderDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orderdetails = action.payload;
    },
    [userPurchase.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.purchaseOrders = action.payload;
    },
  },
});

export const { clearUser, addUserData } = userSlice.actions;

export default userSlice.reducer;
