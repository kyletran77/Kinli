import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
};

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    usersList: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { usersList } = allUsersSlice.actions;
export default allUsersSlice.reducer;
