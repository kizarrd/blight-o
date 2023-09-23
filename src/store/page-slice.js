import { createSlice } from "@reduxjs/toolkit";
import { dummyData } from "../data/dummyData";

const numOfItemsInOnePage = 60;

const getNewItemsList = (currentPageNum, dataLength) => {
  return dummyData.slice(
    (currentPageNum - 1) * numOfItemsInOnePage,
    currentPageNum * numOfItemsInOnePage >= dataLength
      ? dataLength
      : currentPageNum * numOfItemsInOnePage
  );
};

const pageSlice = createSlice({
  name: "pagination",
  initialState: {
    currentPageNum: 1,
    numOfItemsInOnePage,
    maxPageNum: Math.ceil(dummyData.length / numOfItemsInOnePage),
    dataLength: dummyData.length,
    itemsOnCurrentPage: dummyData.slice(0, numOfItemsInOnePage),
  },
  reducers: {
    moveToNextPage(state) {
      if (state.currentPageNum < state.maxPageNum) {
        state.currentPageNum++;
        state.itemsOnCurrentPage = getNewItemsList(state.currentPageNum, state.dataLength);
      }
    },
    moveToPrevPage(state) {
      if (state.currentPageNum > 1) {
        state.currentPageNum--;
        state.itemsOnCurrentPage = getNewItemsList(state.currentPageNum, state.dataLength);
      }
    },
    moveToThisPage(state, action) {
      state.currentPageNum = action.payload.pageNum;
      state.itemsOnCurrentPage = getNewItemsList(state.currentPageNum, state.dataLength);
    },
  },
});

export const pageActions = pageSlice.actions;

export default pageSlice;
