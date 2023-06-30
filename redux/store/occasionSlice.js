import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "@/services/httphandler";

const initialState = {
  isLoading: false,
  occasionList: [],
};

export const occasions = (state) =>
  state.occasion.occasionList?.occasions?.data;
export const getOccasion = createAsyncThunk(
  "occasion",
  async (object = { page: 1, limit: 1000 }) => {
    let response = await getData("occasion", object);
    return response.data;
  }
);

const OccasionSlice = createSlice({
  name: "occasion",
  initialState,
  extraReducers: {
    [getOccasion.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.occasionList = action.payload;
    },
  },
});

export default OccasionSlice.reducer;
