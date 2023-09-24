import { createSlice } from "@reduxjs/toolkit";
import { dummyData } from "../data/dummyData";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResult: [],
  },
  reducers: {
    search(state, action) {
      console.log(action.payload.keyword);
      state.searchResult = dummyData.filter(
        (item) =>
          item.name.toUpperCase().includes(action.payload.keyword.toUpperCase()) ||
          item.brand.toUpperCase().includes(action.payload.keyword.toUpperCase())
      );
      console.log(state.searchResult);
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
