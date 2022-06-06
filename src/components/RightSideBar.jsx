import React from "react";
import { useSelector } from "react-redux";

export default function RightSideBar() {
  const { allUsers } = useSelector((state) => state.allUsers);

  return (
    <div className="bg-slate-100 p-4 mx-2 w-[30rem]">
      <div className="flex flex-col gap-2 bg-gray-50 p-4 max-w-xs mx-auto rounded-md shadow-md">
        <h1>Suggestions</h1>
        <ul className="flex flex-col gap-3">
          {allUsers.map((user) => (
            <li className="flex gap-1 items-center my-1">
              <img
                src={
                  user?.avatar
                    ? user.avatar
                    : "http://cdn.onlinewebfonts.com/svg/img_264570.png"
                }
                alt="user-dp"
                className="h-9 aspect-square rounded-full"
              />
              <div className="flex items-center justify-between w-full">
                <div>
                  <p className="text-sm font-semibold">{user.displayName}</p>
                  <p className="text-xs text-gray-500">
                    @{user.email.split("@")[0]}
                  </p>
                </div>
                <button className="border-2 border-blue-400 rounded-md px-2">
                  Follow
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
