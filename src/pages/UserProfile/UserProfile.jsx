import React from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { profileId } = useParams();
  return <div>UserProfile : {profileId}</div>;
};

export default UserProfile;
