import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResult: [],
    numItemsInOnePage: 60,
    countSearchResult: 0,
  },
  reducers: {
    load(state, action) {
      state.searchResult = action.payload.data;
      state.countSearchResult = action.payload.count;
      state.numItemsInOnePage = action.payload.limit;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
