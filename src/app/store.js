import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/user/userSlice";
import allPostsReducer from "features/allPosts/allPostsSlice";
import usersReducer from "features/allUsers/usersSlice";
import circlesReducer from "features/allCircle/circleSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    allPosts: allPostsReducer,
    allUsers: usersReducer,
    allCircles: circlesReducer
  },
});
