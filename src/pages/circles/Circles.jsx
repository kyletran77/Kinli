import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit3 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { joinCircle, getCircle, getUser } from "../../firebase/firebase-calls";
//import EditProfileModal from "./EditProfileModal";
import { Post } from "components/components";
import { current } from "@reduxjs/toolkit";


export default function Circles() {
  const { circleID } = useParams();
  const { user } = useSelector((state) => state.user);
  const { allPosts } = useSelector((state) => state.allPosts);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const {allCircles} = useSelector((state) => state.allCircles)
  const otherCircle = allCircles?.find((circle) => circle?.circleID == circleID)
  const currentUser = auth?.currentUser;
  const [circleData, setCircleData] = useState([]);



  const filteredPosts = allPosts?.filter(
    (post) => post.uid
  );
  
  useEffect(
    () => {
       if (currentUser) getUser(currentUser, setUserData);
    },
    // eslint-disable-next-line
    [userData]
  );


  useEffect(
    () => {
       if (otherCircle) getCircle(otherCircle?.circleID, setCircleData);
    },
    // eslint-disable-next-line
    [circleData]
  );

  return (
    <div className="ml-0 w-full pt-4 sm:ml-0 md:ml-0 lg:ml-3">
      <section className="relative h-72 w-full">
        {circleData.coverPic && (
          <img
            src={circleData.coverPic}
            alt="cover"
            className="mx-auto h-fit max-h-72 w-full object-cover"
          />
        )}
        <div className="absolute right-1/2 -bottom-1/2 mx-auto flex h-fit w-80 translate-x-1/2 flex-col items-center gap-2 rounded-lg bg-slate-50 py-3 px-2 shadow sm:w-96 md:w-96 lg:w-96">
          <button
            className="absolute right-4 rounded-full border-none bg-slate-100 p-1.5 text-2xl text-gray-600 shadow-md hover:cursor-pointer hover:brightness-95 "
            onClick = {() => joinCircle (currentUser, circleData)  } 
              
          >
            <FiEdit3 />
          </button>
          
          <img
            src={user?.photoURL}
            alt="user-dp"
            className="md:h-18 lg:h-18 aspect-square h-14 w-fit rounded-full object-cover xl:h-24"
          />
          <p className="text-lg font-semibold underline">{circleData?.circleName}</p>
          
          <p className="text-center text-sm sm:text-base text-indent space-y-4 font-semi-bold">{circleData?.circleBio}</p>
       {/*   <p className="text-sm sm:text-base text-sky-400">{circleData?.circleChallenges}</p> */}
          <p className="text-sm sm:text-base font-semibold ">{circleData?.length} Members </p>
          <button class="btn btn-blue">{circleData?.joinCircle} </button>
          <p className="text-sm sm:text-base">{circleData?.diamondCount} 💎 </p>
          
        </div>
          
          
      </section>
       <ul className="mt-44 ">   
      <div className="relative mx-auto mt-2 flex  w-full min-w-[20rem] max-w-[90%] flex-col rounded-lg bg-gray-50 p-4 shadow-md sm:w-3/4 md:mx-auto md:w-3/4 lg:w-full">
      <p className="text-sm sm:text-base text-sky-400">CHALLENGE: {circleData?.circleChallenges} +10💎</p> 

            
      </div>
      <div className="relative mx-auto mt-2 flex  w-full min-w-[20rem] max-w-[90%] flex-col rounded-lg bg-gray-50 p-4 shadow-md sm:w-3/4 md:mx-auto md:w-3/4 lg:w-full">
      <p className="text-sm sm:text-base text-sky-400">Posts from {circleData?.circleName} Members</p> 

            
      </div>

      
            </ul>
      

            <ul className=" mb-16 md:mb-2">
        {filteredPosts?.map((post) => (
          <Post post={post} key={post?.postID} />
          ))}
      </ul>
      {/*  Experience Section */}
      

      
      

        
      
      {/* <ul className="mt-44 mb-16 md:mb-24">
        {filteredPosts?.map((post) => (
          <Post post={post} key={post?.postID} />
          ))}
      </ul> */}
    </div>
  );
}

