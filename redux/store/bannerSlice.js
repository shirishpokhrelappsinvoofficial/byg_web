import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { getData } from "@/services/httphandler";

const initialState = {
  isLoading: false,
  bannerList: [],
};

export const banners = (state) => state.banner.bannerList?.banner;
export const getBanner = createAsyncThunk(
  "banner",
  async (object = { date: moment(new Date()).format("YYYY-MM-DD") }) => {
    let response = await getData("banner", object);
    return response.data;
  }
);

const BannerSlice = createSlice({
  name: "banner",
  initialState,
  extraReducers: {
    [getBanner.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bannerList = action.payload;
    },
  },
});

export default BannerSlice.reducer;
