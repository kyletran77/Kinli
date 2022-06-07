import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { signup } from "./userSlice";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [signupDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "http://cdn.onlinewebfonts.com/svg/img_264570.png",
    confirmPassword: "",
  });
  const { email, password, confirmPassword, name, profilePic } = signupDetails;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSignUpDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submitSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
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
            bio: "",
            posts: [],
            followers: [],
            following: [],
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
            bio: "",
            posts: [],
            followers: [],
            following: [],
          },
          { merge: true }
        );
        localStorage.setItem("authToken", userAuth.user.accessToken);
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
      <div className="flex justify-center items-center h-[92vh] bg-gray-200">
        <form
          className="flex flex-col justify-center items-center gap-4 shadow-md bg-slate-50 p-9 w-96 rounded-md"
          onSubmit={submitSignUp}
        >
          <h1 className="text-xl font-semibold">Create Account</h1>
          <input
            type="text"
            name="name"
            className="w-full p-2 h-9 bg-gray-100"
            placeholder="Enter name"
            required
            onChange={changeHandler}
          />
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
          <div className="w-full relative">
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
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              className="w-full p-2 h-9 bg-gray-100"
              placeholder="Confirm password"
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
            Sign Up
          </button>
          <p>
            Existing User?{" "}
            <Link to="/login" className="text-gray-500 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
