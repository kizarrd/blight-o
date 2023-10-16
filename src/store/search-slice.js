import { createSlice } from "@reduxjs/toolkit";

const numOfItemsInOnePage = 60;

export const getNewItemsList = (inputData, currentPageNum, dataLength) => {
  return inputData.slice(
    (currentPageNum - 1) * numOfItemsInOnePage,
    currentPageNum * numOfItemsInOnePage >= dataLength
      ? dataLength
      : currentPageNum * numOfItemsInOnePage
  );
};

const searchSlice = createSlice({
  name: "search",
  initialState: {
    keyword: null,
    searchResult: [],
    brands: [],
    searchAndPageResult: [],
    numOfItemsInOnePage,
  },
  reducers: {
    load(state, action) {
      state.searchResult = action.payload.fetchedData;
    },
    moveToThisPage(state, action) {
      // console.log(action.payload.page);
      state.searchAndPageResult = getNewItemsList(
        state.searchResult,
        action.payload.page,
        state.searchResult.length
      );
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
