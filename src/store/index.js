import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./page-slice";

const store = configureStore({
  reducer: {
    pagination: pageSlice.reducer,
  },
});

export default store;