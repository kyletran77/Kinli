import { NavLink } from "react-router-dom";
import { AiFillHome, AiFillCompass, AiFillBell } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";

export default function Sidebar() {
  return (
    <div className="flex-none flex flex-col gap-7 text-xl text-gray-700 bg-gray-50 h-[80vh] py-4 px-5  my-4 mx-3 shadow-md rounded-md lg:pr-12">
      <NavLink to="/" className="flex gap-3 items-center">
        <AiFillHome />
        <p className="text-base hidden xl:block">Home</p>
      </NavLink>
      <NavLink to="/" className="flex gap-3 items-center">
        <AiFillCompass />
        <p className="text-base hidden xl:block">Explore</p>
      </NavLink>
      <NavLink to="/" className="flex gap-3 items-center">
        <BsFillBookmarkFill />
        <p className="text-base hidden xl:block">Boookmarks</p>
      </NavLink>
      <NavLink to="/" className="flex gap-3 items-center">
        <AiFillBell />
        <p className="text-base hidden xl:block">Notifications</p>
      </NavLink>
      <NavLink to="/login" className="flex gap-3 items-center">
        <MdOutlineLogout />
        <p className="text-base hidden xl:block">Logout</p>
      </NavLink>
    </div>
  );
}
