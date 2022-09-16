import { MdOutlineLogout, MdLogin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "features/user/userSlice";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { defaultAvatar } from "utils/Constants";
import logo from "assets/Kinli.png";

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const currentUser = auth?.currentUser;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const logoutHandler = async () => {
    dispatch(logout());
    await signOut(auth);
    navigate("/login");
    localStorage.removeItem("authToken");
  };

  return (
    <div className="main flex flex-col sm:flex-row h-12 items-center justify-between p-3 font-semibold bg-white">
      <Link to="/" className="flex">
        <img src={logo} alt="main-logo" className="aspect-square w-6 h-6" />
        <h1 className="text-xl text-gray-600">Kinli</h1>
      </Link>
      <div className="hidden md:flex w-full md:m-0 flex-row justify-center mt-2 sm:mt-2 ml-0"><a
          className="hover:text-gray-600 font-semibold text-base 
          text-center text-gray-400 block cursor-pointer"  href="/aboutLaunch">About Us</a><a
          className="hover:text-gray-600 font-semibold text-base mr-6 ml-6 
          text-center text-gray-400 block cursor-pointer"  href="/login">Home</a><a
          className="hover:text-gray-600 font-semibold text-base 
          text-center text-gray-400 block cursor-pointer"  href="/leader">Lead a Circle</a></div>
      {/* 
      <div className="flex gap-4">
        <Link to="/profile">
          <img
            className="max-w-9 aspect-square h-9 max-h-9 w-fit rounded-full object-cover"
            src={
              currentUser?.photoURL
                ? currentUser?.photoURL
                : defaultAvatar.cover
            }
            alt="user-avatar"
          />
        </Link>
        {user ? (
          <button onClick={logoutHandler}>
            <MdOutlineLogout className="text-2xl" />
          </button>
        ) : (
          <Link to="/login" className="self-center" state={{ from: location }}>
            <MdLogin className="text-2xl" />
          </Link>
        )}
      </div>
      */}
    </div>
  );
}
