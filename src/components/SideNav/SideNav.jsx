import React from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  const uid = "testId";
  return (
    <div>
      <ul>
        <li>
          <NavLink to={"/feed"}>My Feed</NavLink>
        </li>
        <li>
          <NavLink to={"/explore"}>Explore</NavLink>
        </li>
        <li>
          <NavLink to={"/people"}>People</NavLink>
        </li>
        <li>
          <NavLink to={"/bookmarks"}>Bookmarks</NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${uid}`}>My Profile</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
