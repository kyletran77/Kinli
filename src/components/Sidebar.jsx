import { NavLink } from "react-router-dom";
import { navLinks } from "helpers/Constants";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

export default function Sidebar() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="flex-none flex flex-col gap-7 text-xl text-gray-700 bg-gray-50 h-[80vh] py-4 px-5  my-4 mx-3 shadow-md rounded-md">
      {navLinks.map(({ pathTo, icon, img, navPath }) => (
        <NavLink
          to={pathTo}
          className="flex gap-3 items-center px-2 py-1 rounded-md"
        >
          {icon}
          <p className="text-base hidden xl:block">{navPath}</p>
        </NavLink>
      ))}
      <NavLink
        to="/profile"
        className="flex gap-3 items-center px-2 py-1 rounded-md"
      >
        {user?.photoURL ? (
          <img
            src={user?.photoURL}
            alt="user-dp"
            className="h-6 object-cover rounded-full aspect-square"
          />
        ) : (
          <FaUserCircle />
        )}
        <p className="text-base hidden xl:block">Profile</p>
      </NavLink>
    </div>
  );
}
