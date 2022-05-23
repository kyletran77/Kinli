import { signOut } from "firebase/auth";
import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp.jpg";
import { logout } from "../features/user/userSlice";
import { auth } from "../firebase/firebase";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    dispatch(logout());
    await signOut(auth);
    navigate("/login");
    localStorage.removeItem("authToken");
  };

  // Please ignore the below comment, will be using it later
  // const user = useSelector((state) => state.user.user);

  return (
    <div className="p-3 bg-slate-100 font-semibold flex justify-between items-center">
      <h1 className="text-gray-600 text-xl">SocialMedia</h1>
      <div className="flex gap-4">
        <img className="rounded-full h-9" src={dp} alt="user-avatar" />
        <button onClick={logoutHandler}>
          <MdOutlineLogout className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
