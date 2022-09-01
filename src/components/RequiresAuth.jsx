import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequiresAuth() {
  const authToken = localStorage.getItem("authToken");
  const location = useLocation();

  return (authToken) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
