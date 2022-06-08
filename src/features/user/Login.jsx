import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { login } from "./userSlice";
import { collection, doc, setDoc } from "firebase/firestore";

export default function Login() {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    profilePic: "",
  });
  const { email, password, profilePic } = loginDetails;
  let lastLocation = location.state?.from?.pathname || "/";
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await signInWithEmailAndPassword(auth, email, password);
      await updateProfile(userAuth.user, {
        photoURL: profilePic === "" ? userAuth.user.photoURL : profilePic,
      });
      const userRef = collection(db, "users");
      await setDoc(
        doc(userRef, userAuth.user.uid),
        {
          avatar: profilePic === "" ? userAuth.user.photoURL : profilePic,
        },
        { merge: true }
      );
      dispatch(
        login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: userAuth.user.displayName,
          photoURL: userAuth.user.photoURL,
        })
      );
      localStorage.setItem("authToken", userAuth.user.accessToken);
      navigate(lastLocation);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[92vh] bg-gray-200">
      <form
        className="flex flex-col justify-center items-center gap-4 shadow-md bg-slate-50 p-9 w-96 rounded-md"
        onSubmit={loginHandler}
      >
        <h1 className="text-xl font-semibold">Login</h1>
        <input
          type="text"
          name="profilePic"
          className="w-full p-2 h-9 bg-gray-100"
          placeholder="Enter profile pic URL (optional)"
          onChange={changeHandler}
        />
        <input
          type="email"
          name="email"
          className="w-full p-2 h-9 bg-gray-100"
          placeholder="Enter email"
          required
          onChange={changeHandler}
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="w-full p-2 h-9 bg-gray-100"
            placeholder="Enter password"
            required
            onChange={changeHandler}
          />
          <div role="button" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? (
              <AiFillEyeInvisible className="absolute right-2 bottom-1/2 translate-y-1/2 text-gray-500 text-lg" />
            ) : (
              <AiFillEye className="absolute right-2 bottom-1/2 translate-y-1/2 text-gray-500 text-lg" />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="border-2 bg-gray-200 py-1 px-4 rounded-md w-1/2"
        >
          Login
        </button>
        <p>
          <Link to="/signup" className="text-gray-500 font-semibold">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}
