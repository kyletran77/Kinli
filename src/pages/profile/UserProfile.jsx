import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit3 } from "react-icons/fi";
import { auth } from "../../firebase/firebase";
import { getUser } from "../../firebase/firebase-calls";
import EditProfileModal from "./EditProfileModal";
import EditExperienceProfileModal from "./EditExperienceModal";
import EditEducationProfileModal from "./EditEducationModal";
import { Post, Entry, Exp } from "components/components";
import { Body } from "pages/pages";
import { MdOutlineLogout, MdLogin } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { defaultAvatar } from "utils/Constants";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { logout } from "features/user/userSlice";




export default function UserProfile() {
  const { user } = useSelector((state) => state.user);
  const { allPosts } = useSelector((state) => state.allPosts);


  //profile changes
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);


  //Experience Changes
  const [showModalExp, setShowModalExp] = useState(false);
  const [showModalEdu, setShowModalEdu] = useState(false);

  const currentUser = auth?.currentUser;
  

  const filteredPosts = allPosts?.filter(
    (post) => post.uid === currentUser?.uid
  );
  const filteredPostsExp = allPosts?.filter(
    (post) => post.uid === currentUser?.uid 
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

const logoutHandler = async () => {
  dispatch(logout());
  await signOut(auth);
  navigate("/login");
  localStorage.removeItem("authToken");
};




  useEffect(
    () => {
      if (userData.length == 0) getUser(currentUser, setUserData);
      console.log("User Fetched!")
    },
    // eslint-disable-next-line
    [currentUser]
  );

  return (
    <div className="ml-0 w-full pt-4 sm:ml-0 md:ml-0 lg:ml-3">
      <div>
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
           <button onClick={logoutHandler}
           className="absolute left-4 rounded-full border-none bg-slate-100 p-1.5 text-2xl text-gray-600 shadow-md hover:cursor-pointer hover:brightness-95 ">
            <MdOutlineLogout className="text-2xl ablsolue left-4" />
          </button>

          <img
            src={user?.photoURL}
            alt="user-dp"
            className="md:h-18 lg:h-18 aspect-square h-14 w-fit rounded-full object-cover xl:h-24"
          />
          <p className="text-lg font-semibold">{currentUser?.displayName}</p>
          <p className="text-center text-sm sm:text-base">{userData?.bio}</p>
          <p className="text-sm sm:text-base">{userData?.website}</p>
          <p className="text-sm sm:text-base">Status: {userData?.status}</p>

          
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
            <div className="flex gap-4">
        {/* <Link to="/profile">
          <img
            className="max-w-9 aspect-square h-9 max-h-9 w-fit rounded-full object-cover"
            src={
              currentUser?.photoURL
                ? currentUser?.photoURL
                : defaultAvatar.cover
            }
            alt="user-avatar"
          />
        </Link> */}
       
      </div>
     
          </div>
        </div>
        
      </section>
      </div>
     <div>
     </div>
     {/* Work Experience section */}
     <ul className="mt-44 mb-16 md:mb-24">

     <div className="relative mx-0 mt-0 mb-0 flex h-fit w-full min-w-[20rem] max-w-[90%] flex-col rounded-lg bg-gray-50 p-4 shadow-md sm:w-3/4 md:mx-auto md:w-3/4 lg:w-full">
     <p className="text-lg font-semibold">Work Experience</p>
     <button
            className="absolute right-4 rounded-full border-none bg-slate-100 p-1.5 text-2xl text-gray-600 shadow-md hover:cursor-pointer hover:brightness-95 "
            onClick={() => setShowModalExp((prev) => !prev)}
          >
            <FiEdit3 />
          </button>
        {userData.experience?.map((entries) => (
          (entries.company != "")?<Entry post={entries} key={userData?.userID} /> : ""
          ))}


       


          
        
    </div>
    </ul>
    {/* Education */}
    <ul className="mt-5 mb-16 md:mb-24">
    





    



<div className="relative mx-0 mt-0 mb-0 flex h-fit w-full min-w-[20rem] max-w-[90%] flex-col rounded-lg bg-gray-50 p-4 shadow-md sm:w-3/4 md:mx-auto md:w-3/4 lg:w-full">
<p className="text-lg font-semibold">Education</p>
<button
       className="absolute right-4 rounded-full border-none bg-slate-100 p-1.5 text-2xl text-gray-600 shadow-md hover:cursor-pointer hover:brightness-95 "
       onClick={() => setShowModalEdu((prev) => !prev)}
     >
       <FiEdit3 />
     </button>
   {userData.education?.map((entries) => (
     (entries.company != "")?<Entry post={entries} key={userData?.userID} /> : ""
     ))}
   
</div>

{/* */}




{ (userData.displayName != undefined) && (<Body  userData ={userData}/> ) }






</ul>
{/*       
      <section className="relative h-72 w-full">
        
        <div className="absolute right-1/2 -bottom-1/2 mx-auto flex h-fit w-80 translate-x-1/2 flex-col items-center gap-2 rounded-lg bg-slate-50 py-3 px-2 shadow sm:w-96 md:w-96 lg:w-96">
          

          <img
            src={user?.photoURL}
            alt="user-dp"
            className="md:h-18 lg:h-18 aspect-square h-14 w-fit rounded-full object-cover xl:h-24"
          />
          <p className="text-lg font-semibold">Work Experience</p>
          <p className="text-center text-sm sm:text-base">{userData?.bio}</p>
          <p className="text-sm sm:text-base">{userData?.website}</p>
          <ul className="mt-44 mb-16 md:mb-24">
        {userData.experience?.map((entries) => (
          <Entry post={entries} key={userData?.userID} />
          ))}
      </ul>
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
        
      </section> */}
      {showModal && (
        <div className="h-full">
          <div className="fixed inset-0 flex h-screen w-full items-center justify-center bg-gray-900 opacity-70 "></div>
          <EditProfileModal
            setShowModal={setShowModal}
            userData={userData}
            setUserData={setUserData}
            key={userData?.userID}
          />
        </div>
      )}
      {showModalExp && (
        <div className="h-full">
          <div className="fixed inset-0 flex h-screen w-full items-center justify-center bg-gray-900 opacity-70 "></div>
          <EditExperienceProfileModal
            setShowModal={setShowModalExp}
            userData={userData}
            setUserData={setUserData}
            key={userData?.userID}
          />
        </div>
      )}
      {showModalEdu && (

        <div className="h-full">
          <div className="fixed inset-0 flex h-screen w-full items-center justify-center bg-gray-900 opacity-70 "></div>
          <EditEducationProfileModal
            setShowModal={setShowModalEdu}
            userData={userData}
            setUserData={setUserData}
            key={userData?.userID}
          />
        </div>
      )}
      <ul className="mt-44 mb-16 md:mb-24">
        {filteredPosts?.map((post) => (
          <Post post={post} key={post?.postID} />
          ))}
      </ul>
    </div>
  );
}
