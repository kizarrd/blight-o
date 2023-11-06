import { createSlice } from "@reduxjs/toolkit";

// const numOfItemsInOnePage = 60;

// export const getNewItemsList = (inputData, currentPageNum, dataLength) => {
//   return inputData.slice(
//     (currentPageNum - 1) * numOfItemsInOnePage,
//     currentPageNum * numOfItemsInOnePage >= dataLength
//       ? dataLength
//       : currentPageNum * numOfItemsInOnePage
//   );
// };

const searchSlice = createSlice({
  name: "search",
  initialState: {
    // keyword: null,
    searchResult: [],
    // brands: [],
    // searchAndPageResult: [],
    // numOfItemsInOnePage,
    numItemsInOnePage: 60,
    countSearchResult: 0,
  },
  reducers: {
    load(state, action) {
      state.searchResult = action.payload.data;
      state.countSearchResult = action.payload.count;
      state.numItemsInOnePage = action.payload.limit;
    },
    // moveToThisPage(state, action) {
    //   // console.log(action.payload.page);
    //   state.searchAndPageResult = getNewItemsList(
    //     state.searchResult,
    //     action.payload.page,
    //     state.searchResult.length
    //   );
    // },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
