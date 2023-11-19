import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./search-slice";
import loadingSlice from "./loading-slice";
import navOpenSlice from "./navopen-slice";

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    loading: loadingSlice.reducer,
    navOpen: navOpenSlice.reducer,
  },
});

export default store;