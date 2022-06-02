import { Route, Routes } from "react-router-dom";
import Login from "features/user/Login";
import Signup from "features/user/Signup";
import Explore from "pages/explore/Explore";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Explore />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
