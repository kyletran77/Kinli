import { Route, Routes } from "react-router-dom";
import Login from "features/user/Login";
import Signup from "features/user/Signup";
import Explore from "pages/explore/Explore";
import UserProfile from "pages/profile/UserProfile";
import Home from "pages/home/Home";
import OtherProfile from "pages/otherProfile/OtherProfile";
import Bookmarks from "pages/bookmarks/Bookmarks";
import Archives from "pages/archives/Archives";
import RequiresAuth from "components/RequiresAuth";

export default function Router() {
  return (
    <Routes>
      <Route element={<RequiresAuth />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/:profileID" element={<OtherProfile />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/archives" element={<Archives />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
