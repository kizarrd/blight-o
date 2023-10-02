import { createSlice } from "@reduxjs/toolkit";
import { dummyData } from "../data/dummyData";

const numOfItemsInOnePage = 60;

const getNewItemsList = (inputData, currentPageNum, dataLength) => {
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
    searchResult: dummyData,
    searchAndPageResult: getNewItemsList(dummyData, 1, dummyData.length), 
    numOfItemsInOnePage,
  },
  reducers: {
    search(state, action) {
      // searching
      if(action.payload.keyword !== state.keyword){
        state.searchResult = dummyData.filter(
          (item) =>
            item.name
              .toUpperCase()
              .includes(action.payload.keyword.toUpperCase()) ||
            item.brand
              .toUpperCase()
              .includes(action.payload.keyword.toUpperCase())
        );
      }
      console.log(state.searchResult);
      // go to first page (when search keywoard is changed)
      // console.log(action.payload.page);
      // state.searchAndPageResult = getNewItemsList(
      //   state.searchResult,
      //   1,
      //   state.searchResult.length
      // );
      // console.log(state.searchResult);
      // console.log(state.searchAndPageResult);
    },
    moveToThisPage(state, action) {
      console.log(action.payload.page);
      state.searchAndPageResult = getNewItemsList(
        state.searchResult,
        action.payload.page,
        state.searchResult.length
      );
    },
    reset(state) {
      state.searchResult = dummyData;
      // console.log(state.searchResult);
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
