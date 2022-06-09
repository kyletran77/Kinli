import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { profileUpdate, uploadImage } from "../../firebase/firebase-calls";
import toast from "react-hot-toast";
import { FiEdit3 } from "react-icons/fi";

export default function EditProfileModal({
  setShowModal,
  userData,
  setUserData,
}) {
  const { user } = useSelector((state) => state.user);
  const currentUser = auth?.currentUser;

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

  const handleUserImage = async (e) => {
    const file = e.target.files[0];
    const field = e.target.name;
    const loader = toast.loading("uploading image");
    const path = `images/${currentUser.uid}/${file.name}`;
    const fieldURL = await uploadImage(path, file);
    toast.success("uploaded image", { id: loader });
    setUserInfo({ ...userInfo, [field]: fieldURL });
  };

  const updateUserData = async (e) => {
    e.preventDefault();
    await setUserData((prev) => ({
      ...prev,
      coverPic: userInfo?.coverPic ? userInfo?.coverPic : userData.coverPic,
      avatar: userInfo?.avatar ? userInfo?.avatar : userData.avatar,
      bio: userInfo?.bio ? userInfo?.bio : userData.bio,
      website: userInfo?.website ? userInfo?.website : userData.website,
    }));
    setShowModal(false);
  };

  useEffect(() => {
    profileUpdate(userInfo, userData, currentUser, dispatch);
    // eslint-disable-next-line
  }, [userData]);

  return (
    <div className="fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-1/2">
      <form
        className="flex flex-col p-4 bg-slate-200 h-fit rounded-md"
        onSubmit={updateUserData}
      >
        <AiFillCloseCircle
          className="text-3xl absolute right-2 top-2 text-gray-500 hover:cursor-pointer hover:brightness-90  z-20"
          onClick={() => setShowModal((prev) => !prev)}
        />
        <div className="relative">
          <img
            src={userInfo?.coverPic ? userInfo?.coverPic : userData?.coverPic}
            alt="updated-dp"
            className="max-h-48 w-full object-cover aspect-auto mx-auto relative"
          />
          <label
            htmlFor="coverPic"
            className="text-xl text-gray-500 absolute right-8 top-5"
          >
            <input
              type="file"
              id="coverPic"
              name="coverPic"
              accept="image/*, .gif"
              className="hidden"
              onChange={handleUserImage}
            />
            <FiEdit3 />
          </label>
          <div className="w-80 h-fit mx-auto bg-slate-50 absolute right-1/2 translate-x-1/2 -bottom-1/2 rounded-lg shadow flex flex-col items-center py-3 px-2 gap-2 md:w-1/3 lg:w-1/2">
            <img
              src={userInfo?.avatar ? userInfo?.avatar : user?.photoURL}
              alt="updated-dp"
              className="h-24 w-fit object-cover md:h-32 aspect-square rounded-full"
            />
            <label
              htmlFor="avatar"
              className="text-xl text-gray-500 absolute right-5 top-5"
            >
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*, .gif"
                className="hidden"
                onChange={handleUserImage}
              />
              <FiEdit3 />
            </label>
          </div>
        </div>

        <textarea
          type="text"
          name="bio"
          placeholder="Update Bio"
          className="p-2 m-2 mt-28 focus:outline-1 focus:outline focus:outline-slate-400"
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
