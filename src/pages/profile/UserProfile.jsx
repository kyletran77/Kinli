import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit3 } from "react-icons/fi";
import { auth } from "../../firebase/firebase";
import { getUser } from "../../firebase/firebase-calls";
import EditProfileModal from "./EditProfileModal";
import Post from "components/Post";

export default function UserProfile() {
  const { user } = useSelector((state) => state.user);
  const { allPosts } = useSelector((state) => state.allPosts);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const currentUser = auth?.currentUser;

  const filteredPosts = allPosts?.filter(
    (post) => post.uid === currentUser?.uid
  );

  useEffect(
    () => {
      if (currentUser) getUser(currentUser, setUserData);
    },
    // eslint-disable-next-line
    [currentUser]
  );

  return (
    <div className="w-full pt-4 ml-3">
      <section className="w-full h-72 relative">
        {userData.coverPic && (
          <img
            src={userData.coverPic}
            alt="cover"
            className="w-full h-fit max-h-72 object-cover mx-auto"
          />
        )}
        <div className="w-80 h-fit mx-auto bg-slate-50  absolute right-1/2 translate-x-1/2 -bottom-1/2 rounded-lg shadow flex flex-col items-center py-3 px-2 gap-2 md:w-1/3 lg:w-1/2">
          <button
            className="text-2xl absolute right-4 text-gray-600"
            onClick={() => setShowModal((prev) => !prev)}
          >
            <FiEdit3 />
          </button>

          <img
            src={user?.photoURL}
            alt="user-dp"
            className="h-24 w-fit object-cover md:h-32 aspect-square rounded-full"
          />
          <p className="text-lg font-semibold">{currentUser?.displayName}</p>
          <p className="text-center">{userData?.bio}</p>
          <p>{userData?.website}</p>
          <div className="flex flex-wrap gap-1 justify-center md:w-full md:gap-1  md:justify-center text-slate-50 lg:scale-100 px-2 md:px-0 lg:gap-5">
            <div className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full px-3 py-1">
              {userData?.followers?.length} Followers
            </div>
            <div className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full px-3 py-1">
              {user?.following?.length} Following
            </div>
            <div className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full px-3 py-1">
              {filteredPosts?.length} Posts
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <div className="h-full">
          <div className="fixed inset-0 h-screen w-full bg-gray-900 opacity-70 flex items-center justify-center"></div>
          <EditProfileModal
            setShowModal={setShowModal}
            userData={userData}
            setUserData={setUserData}
            key={userData?.userID}
          />
        </div>
      )}
      <ul className="mt-44">
        {filteredPosts?.map((post) => (
          <Post post={post} key={post?.postID} />
        ))}
      </ul>
    </div>
  );
}
