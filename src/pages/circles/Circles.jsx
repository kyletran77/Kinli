import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit3 } from "react-icons/fi";
import { auth } from "../../firebase/firebase";
import { getCircle } from "../../firebase/firebase-calls";
//import EditProfileModal from "./EditProfileModal";
import { Post } from "components/components";

export default function Circles() {
  const { user } = useSelector((state) => state.user);
  const { allPosts } = useSelector((state) => state.allPosts);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const currentUser = "UNONK7sNU0RI6Ia66Yje";

  const filteredPosts = allPosts?.filter(
    (post) => post.uid === currentUser?.uid
  );

  useEffect(
    () => {
       getCircle(currentUser, setUserData);
       console.log(userData?.circleName);
    },
    // eslint-disable-next-line
    [currentUser]
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
          <p className="text-lg font-semibold">{currentUser?.displayName}</p>
          <p className="text-center text-sm sm:text-base">{userData?.bio}</p>
          <p className="text-sm sm:text-base">{userData?.circleName}</p>
          <div className="flex flex-wrap justify-center gap-1 px-2 text-slate-50 sm:gap-2 md:w-full md:justify-center md:gap-3 md:px-0 lg:scale-100 lg:gap-5">
            <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 shadow-md">
              {userData?.followers?.length} Followers
            </div>
            <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 shadow-md">
              {user?.following?.length > 0 ? user?.following?.length : "0"}{" "}
              Following
            </div>
            <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 shadow-md">
              {filteredPosts?.length} Posts
            </div>
          </div>
        </div>
        
      </section>

      {/*  Experience Section */}
      <section className="relative h-72 w-full">
        
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
          <p className="text-lg font-semibold">{userData?.circleName}</p>
          <p className="text-center text-sm sm:text-base">{userData?.bio}</p>
          <p className="text-sm sm:text-base">{userData?.website}</p>
          <div className="flex flex-wrap justify-center gap-1 px-2 text-slate-50 sm:gap-2 md:w-full md:justify-center md:gap-3 md:px-0 lg:scale-100 lg:gap-5">
            <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 shadow-md">
              {userData?.followers?.length} Circle
                

            </div>
            style="background-color: black;color:#fff;"
           
            <textarea className="text-black font-bold">  We are Health Officials! We make use of our medical knowledge to help ones in need! </textarea>

            <textarea className="text-black"> Challenge: Remind 20 people to stay vaccinated! </textarea>

            <textarea className = "text-black"  >We level each other up with our health goals, keeping us sane! </textarea>

            <button> Challenges </button>


            


            <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 shadow-md">
              {user?.following?.length > 0 ? user?.following?.length : "0"}{" "}
              Followers
              </div>
            
            <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 shadow-md">
              {user?.following?.length > 0 ? user?.following?.length : "0"}{" "}
              Following
            </div>
            <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 shadow-md">
              {filteredPosts?.length} Posts
            </div>
          </div>
        </div>
        
      </section>


            {/*  Education Section*/}
            <section className="relative h-72 w-full">
        
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
          <p className="text-lg font-semibold">{currentUser?.displayName}</p>
          <p className="text-center text-sm sm:text-base">{userData?.bio}</p>
          <p className="text-sm sm:text-base">{userData?.website}</p>
          <div className="flex flex-wrap justify-center gap-1 px-2 text-slate-50 sm:gap-2 md:w-full md:justify-center md:gap-3 md:px-0 lg:scale-100 lg:gap-5">
            <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 shadow-md">
              {userData?.followers?.length} Schools
              
            </div>
            <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 shadow-md">
              {user?.following?.length > 0 ? user?.following?.length : "0"}{" "}
              Following
            </div>
            <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 shadow-md">
              {filteredPosts?.length} Posts
            </div>
          </div>
        </div>
        
      </section>


        {/* Interests Section */ }
        {showModal && (
        <div className="h-full">

        <textarea> CS Bois 🏥 </textarea>

        <textarea> CS Bois </textarea>

        <textarea> CS Bois </textarea>


          <div className="fixed inset-0 flex h-screen w-full items-center justify-center bg-gray-900 opacity-70 "></div>
         {/*  <EditProfileModal
            setShowModal={setShowModal}
            userData={userData}
            setUserData={setUserData}
            key={userData?.userID}
      /> */}
        </div>
/* 

*/
        
      )}
      <ul className="mt-44 mb-16 md:mb-24">
        {filteredPosts?.map((post) => (
          <Post post={post} key={post?.postID} />
          ))}
      </ul>
    </div>
  );
}

