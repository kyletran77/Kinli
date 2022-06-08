import { NavLink } from "react-router-dom";
import { navLinks } from "helpers/Constants";

export default function Sidebar() {
  return (
    <div className="flex-none flex flex-col gap-7 text-xl text-gray-700 bg-gray-50 h-[80vh] py-4 px-5  my-4 mx-3 shadow-md rounded-md">
      {navLinks.map(({ pathTo, icon, navPath }) => (
        <NavLink
          to={pathTo}
          className="flex gap-3 items-center px-2 py-1 rounded-md"
        >
          {icon}
          <p className="text-base hidden xl:block">{navPath}</p>
        </NavLink>
      ))}
    </div>
  );
}
