import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../services/httphandler";

const initialState = {
  isLoading: false,
  cityList: "",
};

export const cities = (state) => state.city.cityList;

export const getCityList = createAsyncThunk(
  "city/getList",
  async (object = { search: "" }) => {
    let response = await getData("getCities", object);
    return response.data;
  }
);

const CitySlice = createSlice({
  name: "city",
  initialState,
  extraReducers: {
    [getCityList.fulfilled]: (state, action) => {
      state.cityList = action.payload.states;
    },
  },
});

export default CitySlice.reducer;
