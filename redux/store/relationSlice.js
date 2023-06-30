import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "@/services/httphandler";

const initialState = {
  isLoading: false,
  relationList: [],
};

export const relations = (state) =>
  state.relation.relationList?.relations?.data;
export const getRelation = createAsyncThunk(
  "relation",
  async (object = { page: 1, limit: 1000 }) => {
    let response = await getData("relation", object);
    return response.data;
  }
);

const RelationSlice = createSlice({
  name: "relation",
  initialState,
  extraReducers: {
    [getRelation.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.relationList = action.payload;
    },
  },
});

export default RelationSlice.reducer;
