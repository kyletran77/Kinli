import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: "",
    displayName: "",
    photoURL: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    signup: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateDP: (state, action) => {
      state.user = { ...state.user, photoURL: action.payload };
    },
    setFollowers: (state, action) => {
      state.user = { ...state.user, followers: action.payload };
    },
    setFollowing: (state, action) => {
      state.user = { ...state.user, following: action.payload };
    },
  },
});

export const { login, signup, logout, updateDP, setFollowers, setFollowing } =
  userSlice.actions;
export default userSlice.reducer;
