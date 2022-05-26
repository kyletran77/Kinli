import React from "react";
import { FollowMore, SideNav, TopNav } from "../../components";

const MainContainer = ({ children }) => {
  return (
    <div>
      <TopNav />
      <SideNav />
      {children}
      <FollowMore />
    </div>
  );
};

export default MainContainer;
