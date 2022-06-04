import { signOut } from "firebase/auth";
import { MdOutlineLogout, MdLogin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "features/user/userSlice";
import { auth } from "../firebase/firebase";

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    dispatch(logout());
    await signOut(auth);
    navigate("/login");
    localStorage.removeItem("authToken");
  };

  return (
    <div className="p-3 bg-slate-100 font-semibold flex justify-between items-center">
      <Link to="/">
        <h1 className="text-gray-600 text-xl">SocialMedia</h1>
      </Link>
      <div className="flex gap-4">
        <Link to="/profile">
          <img
            className="rounded-full max-h-9 aspect-square"
            src={
              auth.currentUser?.photoURL
                ? auth.currentUser?.photoURL
                : "http://cdn.onlinewebfonts.com/svg/img_264570.png"
            }
            alt="user-avatar"
          />
        </Link>
        {user ? (
          <button onClick={logoutHandler}>
            <MdOutlineLogout className="text-2xl" />
          </button>
        ) : (
          <Link to="/login" className="self-center">
            <MdLogin className="text-2xl" />
          </Link>
        )}
      </div>
    </div>
  );
}
