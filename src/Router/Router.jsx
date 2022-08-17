import { Route, Routes } from "react-router-dom";
import RequiresAuth from "components/RequiresAuth";
import {
  Home,
  Explore,
  Bookmarks,
  Archives,
  UserProfile,
  OtherProfile,
  Error,
  Login,
  Signup,
  Resume,
  Circles,
  CircleMainPage,
  About,
} from "pages/pages";

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
         <Route path="/resume" element={<Resume />} /> 
         <Route path="/circle" element={<Circles />} /> 
         <Route path="/circleMainPage" element={<CircleMainPage />} /> 
         <Route path="/about" element={<About />} /> 
         <Route path="/circle/:circleID" element={<Circles />} />

      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
