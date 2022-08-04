import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit3 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { getCircle } from "../../firebase/firebase-calls";
//import EditProfileModal from "./EditProfileModal";
import { Post } from "components/components";

export default function Circles() {
  const { circleID } = useParams();
  const { user } = useSelector((state) => state.user);
  const { allPosts } = useSelector((state) => state.allPosts);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const {allCircles} = useSelector((state) => state.allCircles)
  const otherCircle = allCircles?.find((circle) => circle?.circleID == circleID)

  const filteredPosts = allPosts?.filter(
    (post) => post.uid
  );

  useEffect(
    () => {
       getCircle(otherCircle?.circleID, setUserData);
    },
    // eslint-disable-next-line
    [userData]
  );

  return (
    <div className="ml-0 w-full pt-4 sm:ml-0 md:ml-0 lg:ml-3">
      <section className="relative h-72 w-full">
        {userData.coverPic && (
          <img
            src={userData.coverPic}
            alt="cover"
            className="mx-auto h-fit max-h-72 w-full object-cover"
          />
        )}
        <div className="absolute right-1/2 -bottom-1/2 mx-auto flex h-fit w-80 translate-x-1/2 flex-col items-center gap-2 rounded-lg bg-slate-50 py-3 px-2 shadow sm:w-96 md:w-96 lg:w-96">
          <button
            className="absolute right-4 rounded-full border-none bg-slate-100 p-1.5 text-2xl text-gray-600 shadow-md hover:cursor-pointer hover:brightness-95 "
            onClick={() => setShowModal((prev) => !prev)}
          >
            <FiEdit3 />
          </button>

          <img
            src={user?.photoURL}
            alt="user-dp"
            className="md:h-18 lg:h-18 aspect-square h-14 w-fit rounded-full object-cover xl:h-24"
          />
          <p className="text-lg font-semibold">{userData?.CircleName}</p>
          <p className="text-center text-sm sm:text-base">{userData?.bio}</p>
          <p className="text-sm sm:text-base">{userData?.challenge}</p>
          
        </div>
        
      </section>

      {/*  Experience Section */}
      




        
      
      {/* <ul className="mt-44 mb-16 md:mb-24">
        {filteredPosts?.map((post) => (
          <Post post={post} key={post?.postID} />
          ))}
      </ul> */}
    </div>
  );
}

