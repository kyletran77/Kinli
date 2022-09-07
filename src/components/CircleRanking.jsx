import { auth } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { followUser, unfollowUser } from "../firebase/firebase-calls";
import { Link } from "react-router-dom";

export default function CircleRanking() {
  const { allCircles } = useSelector((state) => state.allCircles);
  const { user } = useSelector((state) => state.user);
  const numAscending = [...allCircles].sort((a, b) => b.diamondCount - a.diamondCount);
  console.log(numAscending);

  const handleFollow = (currentUser, otherUser) => {
    const isFollowing = user?.following?.some(
      (user) => user === otherUser?.userID
    );
    isFollowing
      ? unfollowUser(currentUser, otherUser)
      : followUser(currentUser, otherUser);
  };

  return (
    <div className="mx-2 h-[31rem] w-[20rem] bg-slate-100 p-4 hidden md:block">
      <div className="rightsidebar hidden md:flex mx-auto flex h-full max-w-xs flex-col gap-2 overflow-y-auto rounded-md bg-gray-50 p-4 shadow-md lg:block">
        <h1 className="font-bold">Top Circles</h1>
        <ul className="flex flex-col gap-3">
          {numAscending.map((circle, i) => (
            <li className="my-1 flex items-center gap-1" key={i}>
              <p className="mx-0 mr-1 font-bold">{i+1}</p> 
              
              <div className="flex w-full items-center justify-between hover:bg-gray-200 rounded-lg">
                <div>
                  <Link
                    to={`/circle/${circle?.circleID}`}
                    className="text-sm font-semibold"
                  >
                    <li className="flex-row">
                    <img
                src={
                  require("assets/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.webp")
                }
                alt="user-dp"
                className="aspect-square h-9 w-fit rounded-full object-cover ml-0"
              />
                    {circle?.circleName}

                    </li>
                   
                  </Link>
                </div>
                {circle.diamondCount} 💎
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
