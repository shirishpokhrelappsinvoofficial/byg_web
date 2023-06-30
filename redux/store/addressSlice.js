import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteUrlEncoded,
  getData,
  postFormDataWithToken,
  putEncodedData,
} from "../../services/httphandler";
const initialState = {
  isLoading: false,
  addressList: [],
};

export const addressList = (state) =>
  state.address.addressList?.addresses?.data;

export const AddressList = createAsyncThunk(
  "addressList",
  async (object, { dispatch }) => {
    let response = await getData("address/get");
    return response.data;
  }
);

export const AddAddress = createAsyncThunk(
  "addAddress",
  async (object, { dispatch }) => {
    let response = await postFormDataWithToken("address/add", object);
    if (response && response.response_code === 200) {
      dispatch(AddressList());
    }
    return response;
  }
);

export const UpdateAddress = createAsyncThunk(
  "aAddress/update",
  async (object, { dispatch }) => {
    let response = await putEncodedData("address/update", object);
    if (response && response.response_code === 200) {
      dispatch(AddressList());
    }
    return response;
  }
);

export const DeleteAddress = createAsyncThunk(
  "DeleteAddress",
  async (object, { dispatch }) => {
    let response = await deleteUrlEncoded("address/delete", object);
    if (response && response.response_code === 200) {
      toast.success(response.message);
      dispatch(AddressList());
    }
    return response;
  }
);

export const AddressDetails = createAsyncThunk(
  "Address/details",
  async (object, { dispatch }) => {
    let response = await getData("address/detail", object);
    if (response && response.response_code === 200) {
      // toast.success(response.message)
      // dispatch(AddressList())
    }
    return response;
  }
);

const AddressSlice = createSlice({
  name: "address",
  initialState,
  extraReducers: {
    [AddressList.fulfilled]: (state, action) => {
      state.addressList = action.payload;
    },
  },
});

export default AddressSlice.reducer;
