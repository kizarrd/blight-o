import { createSlice } from "@reduxjs/toolkit";
// import { dummyData } from "../data/dummyData";
import { dummyData1 } from "../data/converted_beslow_1008164314"
import { dummyData2 } from "../data/converted_havati_1008175920"
import { dummyData3 } from "../data/converted_rhykershop_1008165125"
import { dummyData4 } from "../data/converted_sculpstore_1008181507"
import { dummyData5 } from "../data/converted_slowsteadyclub_163056"

const numOfItemsInOnePage = 60;
const data = [...dummyData1, ...dummyData2, ...dummyData3, ...dummyData4, ...dummyData5];
const brands = [...new Set(data.map(item => item.brand))];

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
    searchResult: data,
    brands,
    searchAndPageResult: getNewItemsList(data, 1, data.length),
    numOfItemsInOnePage,
  },
  reducers: {
    search(state, action) {
      if (action.payload.keyword !== state.keyword) {
        state.searchResult = data.filter(
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
      state.searchResult = data;
      // console.log(state.searchResult);
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
