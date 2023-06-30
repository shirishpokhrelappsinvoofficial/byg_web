import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../services/httphandler";
const initialState = {
  isLoading: false,
  homepageData: null,
  searchProd: [],
};

export const homepageDatas = (state) => state.homePage.homepageData;
export const banners = (state) => state.homePage.homepageData?.banner;
export const relations = (state) => state.homePage.homepageData?.relations;
export const occasions = (state) => state.homePage.homepageData?.occasions;
export const categories = (state) => state.homePage.homepageData?.categories;
export const coupons = (state) => state.homePage.homepageData?.coupons;
export const recent = (state) => state.homePage.homepageData?.recent_viewes;
export const searchProd = (state) => state.homePage.searchProd;

export const getHomapageData = createAsyncThunk(
  "home",
  async (obj, { dispatch }) => {
    try {
      if (!obj?.load) {
        dispatch(loading(true));
      }
      let response = await getData("home");
      if (response?.response_code === 200 && response?.success) {
        if (!obj?.load) {
          dispatch(loading(false));
        }
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductBySearch = createAsyncThunk(
  "homepageSearch",
  async (object, { dispatch }) => {
    try {
      let response = await getData("homeSearch", object);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const HomepageSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    loading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateHomepageData: (state, action) => {
      state.homepageData = action.payload;
    },
    updateSearchProductList: (state, action) => {
      state.searchProd = action.payload;
    },
  },
  extraReducers: {
    [getHomapageData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.homepageData = action.payload;
    },
    [getProductBySearch.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.searchProd = action.payload;
    },
  },
});
export const { loading, updateHomepageData } = HomepageSlice.actions;
export default HomepageSlice.reducer;
