import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService } from "../../services";

const initialState = {
  displayName: "",
  uid: "",
  email: "",
  photoURL: "",
  isLoggedIn: true,
  error: "",
};

export const loginUser = createAsyncThunk(
  `auth/loginUser`,
  async ({ enteredEmail, password }, { rejectWithValue }) => {
    try {
      const { email, displayName, photoURL, uid } = await loginService(
        enteredEmail,
        password
      );
      console.log(email, displayName, photoURL, uid);
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.displayName = "Sharath";
      state.uid = "asdljdlkjjjjlaskjdskd";
      state.email = "sharath@sharath.com";
      state.photoURL = "lkjsdkjdasdjlkjkljasd";
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state = initialState;
    },
  },
});

export const authReducer = authSlice.reducer;
