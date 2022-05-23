import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { signup } from "./userSlice";

export default function Signup() {
  const navigate = useNavigate();
  const [signupDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const { email, password, name, profilePic } = signupDetails;
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSignUpDetails((prev) => ({ ...prev, [name]: value }));
  };

  const dispatch = useDispatch();

  const submitSignUp = async (e) => {
    e.preventDefault();
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
        })
      );
      const userRef = collection(db, "users");
      await setDoc(
        doc(userRef, userAuth.user.uid),
        {
          email: userAuth.user.email,
          userID: userAuth.user.uid,
          displayName: name,
          avatar: profilePic,
          bio: "",
          posts: [],
          followers: 0,
          following: 0,
        },
        { merge: true }
      );
      localStorage.setItem("authToken", userAuth.user.accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
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
            placeholder="Enter profile pic URL here (optional)"
            onChange={changeHandler}
          />
          <input
            type="email"
            name="email"
            className="w-full p-2 h-9 bg-gray-100"
            placeholder="Enter email here"
            required
            onChange={changeHandler}
          />
          <input
            type="password"
            name="password"
            className="w-full p-2 h-9 bg-gray-100"
            placeholder="Enter password here"
            required
            onChange={changeHandler}
          />
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
