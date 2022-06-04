import { auth, db } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import Post from "components/Post";
import { doc, getDoc } from "firebase/firestore";
import { AiOutlineEdit } from "react-icons/ai";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const { user } = useSelector((state) => state.user);
  const { allPosts } = useSelector((state) => state.allPosts);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const filteredPosts = allPosts.filter(
    (post) => post.uid === auth.currentUser?.uid
  );

  const gradients = [
    "bg-gradient-to-r from-cyan-500 to-blue-500",
    "bg-gradient-to-r from-sky-500 to-indigo-500",
    "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    "bg-gradient-to-r from-yellow-500 to-red-500",
    "bg-gradient-to-r from-green-500 to-green-800",
    "bg-gradient-to-r from-blue-500 to-blue-800",
  ];

  const randomGradient =
    gradients[Math.floor(Math.random() * gradients.length)];

  useEffect(
    () => {
      const userDetails = async () => {
        const docRef = doc(db, "users", auth.currentUser?.uid);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
      };
      if (auth.currentUser) userDetails();
    },
    //eslint-disable-next-line
    [auth.currentUser]
  );

  return (
    <div className="w-full pt-4 ml-3">
      <section className={`w-full ${randomGradient} h-72 relative`}>
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
            <AiOutlineEdit />
          </button>

          <img
            src={user?.photoURL}
            alt="user-dp"
            className="h-24 md:h-32 w-fit object-cover aspect-square rounded-full"
          />
          <p className="text-lg font-semibold">
            {auth.currentUser?.displayName}
          </p>
          <p className="text-center">{userData.bio}</p>
          <p>{userData.website}</p>
          <div className="flex flex-wrap gap-1 justify-center md:w-full md:gap-1  md:justify-center text-slate-50 lg:scale-100 px-2 md:px-0 lg:gap-5">
            <div className={`${randomGradient} rounded-full px-3 py-1`}>
              {userData?.followers?.length} Followers
            </div>
            <div className={`${randomGradient} rounded-full px-3 py-1`}>
              {userData?.following?.length} Following
            </div>
            <div className={`${randomGradient} rounded-full px-3 py-1`}>
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
            key={userData.userID}
          />
        </div>
      )}
      <ul className="mt-44">
        {filteredPosts?.map((post) => (
          <Post post={post} key={post.postID} />
        ))}
      </ul>
    </div>
  );
}
