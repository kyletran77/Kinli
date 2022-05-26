import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userState = useSelector((state) => state.auth);
  const location = useLocation();

  return userState.isLoggedIn ? (
    children
  ) : (
    <Navigate replace={true} to={"/login"} state={{ from: location }} />
  );
};

export default ProtectedRoute;
