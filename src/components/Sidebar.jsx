import { NavLink } from "react-router-dom";
import { navLinks } from "utils/Constants";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

export default function Sidebar() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="fixed border-gray-200 border-r-2 bottom-0 z-10 my-0 mx-0 flex h-fit w-full items-center justify-between self-end bg-gray-50 py-2 px-2 text-gray-700 sm:py-0 lg:h-64 lg:static lg:z-0 lg:mb-auto lg:mt-4 lg:w-fit lg:flex-col lg:px-5 lg:py-4 xl:mx-3 xl:items-start xl:justify-start xl:gap-7 xl:px-5">
      {navLinks.map(({ pathTo, icon, img, navPath }) => (
        <NavLink
          to={pathTo}
          className="hover:bg-gray-200 w-full sm:text-normal flex flex-col items-center gap-3 rounded-md px-2 py-1 text-xl sm:flex-col sm:gap-1 md:flex-col md:gap-1 lg:flex-col lg:gap-1 xl:flex-row xl:justify-start xl:gap-3"
        >
          {icon}
          <p className="hidden sm:block sm:text-xs md:block md:text-sm lg:block lg:text-base xl:inline ">
            {navPath}
          </p>
        </NavLink>
      ))}
      <NavLink
        to="/profile"
        className="hover:bg-gray-200 flex w-full items-center rounded-md px-2 py-0 sm:flex-col sm:gap-1 md:flex-col md:gap-1 lg:flex-col xl:flex-row xl:gap-2"
      >
        {user?.photoURL ? (
          <img
            src={user?.photoURL}
            alt="user-dp"
            className="aspect-square h-5 rounded-full object-cover sm:h-6"
          />
        ) : (
          <FaUserCircle />
        )}
        <p className="hidden sm:block sm:text-xs md:block md:text-sm lg:block lg:text-base xl:block">
          Profile
        </p>
      </NavLink>
      
    </div>
  );
}
