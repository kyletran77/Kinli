import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import allPostsReducer from "../features/allPosts/allPostsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    allPosts: allPostsReducer,
  },
});
