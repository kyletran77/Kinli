import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCircles: [],
};

const allCirclesSlice = createSlice({
  name: "allCircles",
  initialState,
  reducers: {
    circlesList: (state, action) => {
      state.allCircles = action.payload;
    },
  },
});

export const { circlesList } = allCirclesSlice.actions;
export default allCirclesSlice.reducer;
