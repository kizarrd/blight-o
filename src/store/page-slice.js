import { createSlice } from "@reduxjs/toolkit";
import { dummyData } from "../data/dummyData";

const numOfItemsInOnePage = 60;

const pageSlice = createSlice({
  name: "pagination",
  initialState: {
    currentPage: 1,
    numOfItemsInOnePage,
    maxPageNum: Math.ceil(dummyData.length / numOfItemsInOnePage),
    dataLength: dummyData.length,
  },
  reducers: {
    moveToNextPage(state) {
      if (state.currentPage < state.maxPageNum) {
        state.currentPage++;
      }
    },
    moveToPrevPage(state) {
      if (state.currentPage > 1) {
        state.currentPage--;
      }
    },
    moveToThisPage(state, action) {
      state.currentPage = action.payload.pageNum;
    },
  },
});

export const pageActions = pageSlice.actions;

export default pageSlice;
