import { createSlice } from "@reduxjs/toolkit";

const navOpenSlice = createSlice({
  name: "navOpen",
  initialState: {
    state: 'initial',
  },
  reducers: {
    setOpen(state, action) {
      state.state = 'open';
    },
    setClose(state, action) {
      state.state = 'closed';
    },
  },
});

export const navOpenActions = navOpenSlice.actions;

export default navOpenSlice;
