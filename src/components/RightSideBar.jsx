import { auth } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { followUser, unfollowUser } from "../firebase/firebase-calls";
import { Link } from "react-router-dom";

export default function RightSideBar() {
  const { allCircles } = useSelector((state) => state.allCircles);
  const { user } = useSelector((state) => state.user);
  

  // const handleFollow = (currentUser, otherUser) => {
  //   const isFollowing = user?.following?.some(
  //     (user) => user === otherUser?.userID
  //   );
  //   isFollowing
  //     ? unfollowUser(currentUser, otherUser)
  //     : followUser(currentUser, otherUser);
  // };

  return (
    <div className="mx-2  h-[31rem] w-[30rem] bg-slate-100 p-4 lg:block">
      <div className="rightsidebar mx-auto flex h-full max-w-xs flex-col gap-2 overflow-y-auto rounded-md bg-gray-50 p-4 shadow-md lg:block">
        <h1>Circles</h1>
        <ul className="flex flex-col gap-3">
          {allCircles.map((circle) => (
            <li className="my-1 flex items-center gap-1" key={circle.circleID}>
              <img
                src={
                  // otherUser?.avatar
                  //   ? otherUser?.avatar
                  //   : "http://cdn.onlinewebfonts.com/svg/img_264570.png"
                  require("assets/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.webp")
                }
                alt="user-dp"
                className="aspect-square h-9 w-fit rounded-full object-cover"
              />
              <div className="flex w-full items-center justify-between">
                <div>
                  <Link
                    to={`/circle/${circle?.circleID}`}
                    className="text-sm font-semibold"
                  >
                    {circle?.circleName}
                  </Link>
                  {/* <p className="text-xs text-gray-500">
                    @{otherUser?.email?.split("@")[0]}
                  </p> */}
                </div>
                {/* {user?.following?.some((id) => id === otherUser?.userID) ? (
                  <button
                    className="rounded-full border-2 border-transparent bg-blue-200 py-1 px-2 text-sm text-gray-700 hover:brightness-95"
                    onClick={() => handleFollow(auth?.currentUser, otherUser)}
                  >
                    Following
                  </button>
                ) : (
                  <button
                    className="rounded-full  border-2 border-transparent bg-blue-500 py-1 px-2 text-sm text-gray-50 hover:brightness-90"
                    onClick={() => handleFollow(auth?.currentUser, otherUser)}
                  >
                    Follow
                  </button>
                )} */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
// import { auth } from "../firebase/firebase";
// import { useSelector } from "react-redux";
// import { followUser, unfollowUser } from "../firebase/firebase-calls";
// import { Link } from "react-router-dom";

// export default function RightSideBar() {
//   const { allUsers } = useSelector((state) => state.allUsers);
//   const { user } = useSelector((state) => state.user);
//   const otherUsers = allUsers?.filter(
//     (eachUser) => eachUser.userID !== user?.uid
//   );
//   console.log(allUsers);

//   const handleFollow = (currentUser, otherUser) => {
//     const isFollowing = user?.following?.some(
//       (user) => user === otherUser?.userID
//     );
//     isFollowing
//       ? unfollowUser(currentUser, otherUser)
//       : followUser(currentUser, otherUser);
//   };

//   return (
//     <div className="mx-2 hidden h-[31rem] w-[30rem] bg-slate-100 p-4 sm:hidden md:hidden lg:block">
//       <div className="rightsidebar mx-auto flex h-full max-w-xs flex-col gap-2 overflow-y-auto rounded-md bg-gray-50 p-4 shadow-md lg:block">
//         <h1>Suggestions</h1>
//         <ul className="flex flex-col gap-3">
//           {otherUsers.map((otherUser) => (
//             <li className="my-1 flex items-center gap-1" key={otherUser.userID}>
//               <img
//                 src={
//                   otherUser?.avatar
//                     ? otherUser?.avatar
//                     : "http://cdn.onlinewebfonts.com/svg/img_264570.png"
//                 }
//                 alt="user-dp"
//                 className="aspect-square h-9 w-fit rounded-full object-cover"
//               />
//               <div className="flex w-full items-center justify-between">
//                 <div>
//                   <Link
//                     to={`/profile/${otherUser?.userID}`}
//                     className="text-sm font-semibold"
//                   >
//                     {otherUser?.displayName}
//                   </Link>
//                   <p className="text-xs text-gray-500">
//                     @{otherUser?.email?.split("@")[0]}
//                   </p>
//                 </div>
//                 {user?.following?.some((id) => id === otherUser?.userID) ? (
//                   <button
//                     className="rounded-full border-2 border-transparent bg-blue-200 py-1 px-2 text-sm text-gray-700 hover:brightness-95"
//                     onClick={() => handleFollow(auth?.currentUser, otherUser)}
//                   >
//                     Following
//                   </button>
//                 ) : (
//                   <button
//                     className="rounded-full  border-2 border-transparent bg-blue-500 py-1 px-2 text-sm text-gray-50 hover:brightness-90"
//                     onClick={() => handleFollow(auth?.currentUser, otherUser)}
//                   >
//                     Follow
//                   </button>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
