import { auth } from "../firebase/firebase";
import React from "react";
import { useSelector } from "react-redux";
import { followUser, unfollowUser } from "../firebase/firebase-calls";
import { Link } from "react-router-dom";

export default function RightSideBar() {
  const { allUsers } = useSelector((state) => state.allUsers);
  const { user } = useSelector((state) => state.user);
  const otherUsers = allUsers?.filter(
    (eachUser) => eachUser.userID !== user?.uid
  );

  const handleFollow = (currentUser, otherUser) => {
    const isFollowing = user?.following?.some(
      (user) => user === otherUser?.userID
    );
    isFollowing
      ? unfollowUser(currentUser, otherUser)
      : followUser(currentUser, otherUser);
  };

  return (
    <div className="bg-slate-100 p-4 mx-2 w-[30rem]">
      <div className="flex flex-col gap-2 bg-gray-50 p-4 max-w-xs mx-auto rounded-md shadow-md">
        <h1>Suggestions</h1>
        <ul className="flex flex-col gap-3">
          {otherUsers.map((otherUser) => (
            <li className="flex gap-1 items-center my-1" key={otherUser.userID}>
              <img
                src={
                  otherUser?.avatar
                    ? otherUser?.avatar
                    : "http://cdn.onlinewebfonts.com/svg/img_264570.png"
                }
                alt="user-dp"
                className="h-9 w-fit object-cover aspect-square rounded-full"
              />
              <div className="flex items-center justify-between w-full">
                <div>
                  <Link
                    to={`/profile/${otherUser?.userID}`}
                    className="text-sm font-semibold"
                  >
                    {otherUser?.displayName}
                  </Link>
                  <p className="text-xs text-gray-500">
                    @{otherUser?.email?.split("@")[0]}
                  </p>
                </div>
                {user?.following?.some((id) => id === otherUser?.userID) ? (
                  <button
                    className="border-2 border-transparent bg-blue-200 hover:brightness-95 rounded-full py-1 px-2 text-sm text-gray-700"
                    onClick={() => handleFollow(auth?.currentUser, otherUser)}
                  >
                    Following
                  </button>
                ) : (
                  <button
                    className="border-2  border-transparent bg-blue-500 hover:brightness-90 rounded-full py-1 px-2 text-sm text-gray-50"
                    onClick={() => handleFollow(auth?.currentUser, otherUser)}
                  >
                    Follow
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
