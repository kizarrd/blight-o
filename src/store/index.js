import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./search-slice";
import loadingSlice from "./loading-slice";

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    loading: loadingSlice.reducer,
  },
});

export default store;