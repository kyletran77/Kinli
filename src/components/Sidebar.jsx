import { NavLink } from "react-router-dom";
import { AiFillHome, AiFillCompass, AiFillBell } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";

export default function Sidebar() {
  return (
    <div className="flex-none flex flex-col gap-7 text-xl text-gray-700 bg-gray-50 h-[80vh] py-4 px-5  my-4 mx-3 shadow-md rounded-md">
      <NavLink to="/" className="flex gap-3 items-center px-2 py-1 rounded-md">
        <AiFillHome />
        <p className="text-base hidden xl:block">Home</p>
      </NavLink>
      <NavLink
        to="/explore"
        className="flex gap-3 items-center px-2 py-1 rounded-md"
      >
        <AiFillCompass />
        <p className="text-base hidden xl:block">Explore</p>
      </NavLink>
      <NavLink
        to="/bookmarks"
        className="flex gap-3 items-center px-2 py-1 rounded-md"
      >
        <BsFillBookmarkFill />
        <p className="text-base hidden xl:block">Bookmarks</p>
      </NavLink>
      <NavLink
        to="/notifications"
        className="flex gap-3 items-center px-2 py-1 rounded-md"
      >
        <AiFillBell />
        <p className="text-base hidden xl:block">Notifications</p>
      </NavLink>
      <NavLink
        to="/login"
        className="flex gap-3 items-center px-2 py-1 rounded-md"
      >
        <MdOutlineLogout />
        <p className="text-base hidden xl:block">Logout</p>
      </NavLink>
    </div>
  );
}
