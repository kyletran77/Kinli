import React from "react";

export default function RightSideBar() {
  return (
    <div className="bg-slate-100 p-4 mx-2 w-[30rem]">
      <div className="flex flex-col gap-2 bg-gray-50 p-4 max-w-xs mx-auto rounded-md shadow-md">
        <h1>Suggestions</h1>
        <ul className="flex flex-col gap-3">
          <li className="flex gap-1 items-center">
            <img
              src="https://pngset.com/images/female-user-image-icon-food-logo-symbol-trademark-transparent-png-839698.png"
              alt="user-dp"
              className="h-9 rounded-full"
            />
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-sm font-semibold">Regina Phalange</p>
                <p className="text-xs text-gray-500">@iykyk</p>
              </div>
              <button className="border-2 border-blue-400 rounded-md px-2">
                Follow
              </button>
            </div>
          </li>
          <li className="flex gap-1 items-center">
            <img
              src="https://pngset.com/images/female-user-image-icon-food-logo-symbol-trademark-transparent-png-839698.png"
              alt="user-dp"
              className="h-9 rounded-full"
            />
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-sm font-semibold">Regina Phalange</p>
                <p className="text-xs text-gray-500">@iykyk</p>
              </div>
              <button className="border-2 border-blue-400 rounded-md px-2">
                Follow
              </button>
            </div>
          </li>
          <li className="flex gap-1 items-center">
            <img
              src="https://pngset.com/images/female-user-image-icon-food-logo-symbol-trademark-transparent-png-839698.png"
              alt="user-dp"
              className="h-9 rounded-full"
            />
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-sm font-semibold">Regina Phalange</p>
                <p className="text-xs text-gray-500">@iykyk</p>
              </div>
              <button className="border-2 border-blue-400 rounded-md px-2">
                Follow
              </button>
            </div>
          </li>
          <li className="flex gap-1 items-center">
            <img
              src="https://pngset.com/images/female-user-image-icon-food-logo-symbol-trademark-transparent-png-839698.png"
              alt="user-dp"
              className="h-9 rounded-full"
            />
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-sm font-semibold">Regina Phalange</p>
                <p className="text-xs text-gray-500">@iykyk</p>
              </div>
              <button className="border-2 border-blue-400 rounded-md px-2">
                Follow
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
