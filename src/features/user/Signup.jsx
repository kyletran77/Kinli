import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { signup } from "./userSlice";
import { defaultAvatar } from "utils/Constants";
import toast from "react-hot-toast";
import { getAnalytics, logEvent } from "firebase/analytics";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [signupDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: defaultAvatar.avatar,
    confirmPassword: "",
  });
  const { email, password, confirmPassword, name, profilePic } = signupDetails;

  function recordSignup() {
    const analytics = getAnalytics();
    logEvent(analytics, 'signup');
    console.log("signed up!");
  }
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSignUpDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submitSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const loader = toast.loading("Signing you up..");
        const userAuth = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userAuth.user, {
          displayName: name,
          photoURL: profilePic,
        });

        dispatch(
          signup({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: name,
            photoURL: profilePic,
            coverPic: defaultAvatar.cover,
            bio: "",
            posts: [],
            followers: [],
            following: [],
            archives: [],
            bookmarks: [],
            experience: [],
            interests: [],
            education: [],
          })
        );
        const userRef = collection(db, "users");
        await setDoc(
          doc(userRef, userAuth.user.uid),
          {
            email: userAuth.user.email,
            userID: userAuth.user.uid,
            displayName: name,
            avatar: userAuth.user.photoURL,
            coverPic: defaultAvatar.cover,
            bio: "",
            posts: [],
            followers: [],
            following: [],
            archives: [],
            bookmarks: [],
            experience: [],
            interests: [],
            education: [],
          },
          { merge: true }
        );
        localStorage.setItem("authToken", userAuth.user.accessToken);
        toast.success(`Welcome to Kinli, ${name}!!`, { id: loader });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div>
      <div className="flex h-[92vh] items-center justify-center bg-gray-200">
        <form
          className="flex w-80 flex-col items-center justify-center gap-4 rounded-md bg-slate-50 p-9 shadow-md sm:w-96"
          onSubmit={submitSignUp}
        >
          <h1 className="text-xl font-semibold">Create Account</h1>
          <input
            type="text"
            name="name"
            className="h-9 w-full bg-gray-100 p-2"
            placeholder="Enter name"
            required
            onChange={changeHandler}
          />
          <input
            type="text"
            name="profilePic"
            className="h-9 w-full bg-gray-100 p-2"
            placeholder="Enter profile pic URL (optional)"
            onChange={changeHandler}
          />
          <input
            type="email"
            name="email"
            className="h-9 w-full bg-gray-100 p-2"
            placeholder="Enter email"
            required
            onChange={changeHandler}
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="h-9 w-full bg-gray-100 p-2"
              placeholder="Enter password"
              required
              onChange={changeHandler}
            />
            <div role="button" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (
                <AiFillEyeInvisible className="absolute right-2 bottom-1/2 translate-y-1/2 text-lg text-gray-500" />
              ) : (
                <AiFillEye className="absolute right-2 bottom-1/2 translate-y-1/2 text-lg text-gray-500" />
              )}
            </div>
          </div>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              className="h-9 w-full bg-gray-100 p-2"
              placeholder="Confirm password"
              required
              onChange={changeHandler}
            />
            <div role="button" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (
                <AiFillEyeInvisible className="absolute right-2 bottom-1/2 translate-y-1/2 text-lg text-gray-500" />
              ) : (
                <AiFillEye className="absolute right-2 bottom-1/2 translate-y-1/2 text-lg text-gray-500" />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-1/2 rounded-md border-2 bg-gray-200 py-1 px-4"
            onClick= { () => recordSignup()}
          >
            Sign Up
          </button>
          <p>
            Existing User?{" "}
            <Link to="/login" className="font-semibold text-gray-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
