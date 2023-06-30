import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "@/services/httphandler";
import Cookies from "js-cookie";

const initialState = {
  isLoading: false,
  categoryList: [],
  category: Cookies.get("category") ? Cookies.get("category") : "",
  sub_category: Cookies.get("sub_category_id")
    ? Cookies.get("sub_category_id")
    : "",
};

export const category = (state) => state.category.categoryList;
export const getCategory = createAsyncThunk(
  "category",
  async (object = { page: 1, limit: 1000 }) => {
    let response = await getData("category", object);
    return response.data;
  }
);

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateId: (state, action) => {
      state.category = action.payload.id;
      state.sub_category = action.payload.s_id;
    },
  },
  extraReducers: {
    [getCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categoryList = action.payload?.categories?.data || [];
    },
  },
});

export const { updateId } = CategorySlice.actions;

export default CategorySlice.reducer;
