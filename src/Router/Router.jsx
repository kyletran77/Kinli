import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../features/user/Login";
import Signup from "../features/user/Signup";
import UserFeed from "../pages/userFeed/UserFeed";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
