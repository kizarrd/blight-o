import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    state: false,
  },
  reducers: {
    setLoading(state, action) {
      state.state = true;
    },
    setIdle(state, action) {
      state.state = false;
    }
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice;
