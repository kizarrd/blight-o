import { createSlice } from "@reduxjs/toolkit";

// const fetchItemsData = () => {
//   return async (dispatch, getState) => {
//     const loading = getState().loading.state;
//     if(loading){
//       return;
//     }
//     dispatch(loadingActions.setLoading());
//     const 
//   };
// };

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResult: [],
    numItemsInOnePage: 60,
    countSearchResult: 0,
  },
  reducers: {
    load(state, action) {
      state.searchResult = action.payload.data;
      state.countSearchResult = action.payload.count;
      state.numItemsInOnePage = action.payload.limit;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
