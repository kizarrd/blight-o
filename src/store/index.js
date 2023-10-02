import { configureStore } from "@reduxjs/toolkit";
// import pageSlice from "./page-slice";
import searchSlice from "./search-slice";

const store = configureStore({
  reducer: {
    // pagination: pageSlice.reducer,
    search: searchSlice.reducer,
  },
});

export default store;