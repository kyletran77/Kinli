import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { updateDP } from "features/user/userSlice";

export default function EditProfileModal({
  setShowModal,
  userData,
  setUserData,
}) {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    coverPic: "",
    avatar: "",
    bio: "",
    website: "",
  });

  const updateUserInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const updateUserData = async (e) => {
    e.preventDefault();
    await setUserData((prev) => ({
      ...prev,
      coverPic: userInfo.coverPic ? userInfo.coverPic : userData.coverPic,
      avatar: userInfo.avatar ? userInfo.avatar : userData.avatar,
      bio: userInfo.bio ? userInfo.bio : userData.bio,
      website: userInfo.website ? userInfo.website : userData.website,
    }));
    setShowModal(false);
  };

  useEffect(() => {
    const profileUpdate = async () => {
      await setDoc(
        doc(db, "users", auth.currentUser?.uid),
        {
          coverPic: userInfo?.coverPic
            ? userInfo.coverPic
            : userData.coverPic
            ? userData.coverPic
            : "",
          avatar: userInfo.avatar ? userInfo.avatar : userData.avatar,
          bio: userInfo.bio ? userInfo.bio : userData.bio,
          website: userInfo?.website
            ? userInfo.website
            : userData.website
            ? userData.website
            : "",
        },
        { merge: true }
      );
      await updateProfile(auth.currentUser, {
        photoURL: userData.avatar,
      });
      dispatch(updateDP(userData.avatar));
    };
    profileUpdate();

    // eslint-disable-next-line
  }, [userData]);

  return (
    <div className="fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-1/2">
      <form
        className="flex flex-col p-4 bg-slate-200 h-fit rounded-md"
        onSubmit={updateUserData}
      >
        <AiFillCloseCircle
          className="text-3xl absolute right-5 text-gray-500 hover:cursor-pointer hover:brightness-90"
          onClick={() => setShowModal((prev) => !prev)}
        />
        <img
          src={userInfo?.avatar ? userInfo?.avatar : user?.photoURL}
          alt="updated-dp"
          className="h-24 w-fit object-cover aspect-square rounded-full mx-auto"
        />
        <input
          type="text"
          name="coverPic"
          placeholder="Update Cover Pic URL"
          className="p-2 m-2 focus:outline-1 focus:outline focus:outline-slate-400"
          onChange={updateUserInfo}
        />
        <input
          type="text"
          name="avatar"
          placeholder="Update Profile Pic URL"
          className="p-2 m-2 focus:outline-1 focus:outline focus:outline-slate-400"
          onChange={updateUserInfo}
        />
        <textarea
          type="text"
          name="bio"
          placeholder="Update Bio"
          className="p-2 m-2 focus:outline-1 focus:outline focus:outline-slate-400"
          onChange={updateUserInfo}
        />
        <input
          type="text"
          name="website"
          placeholder="Update Website/Portfolio"
          className="p-2 m-2 focus:outline-1 focus:outline focus:outline-slate-400"
          onChange={updateUserInfo}
        />
        <button
          type="submit"
          className="p-2 mt-2 outline-none w-fit mx-auto rounded-lg bg-slate-100 hover:cursor-pointer hover:bg-slate-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
