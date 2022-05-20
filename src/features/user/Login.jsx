import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { login } from "./userSlice";

export default function Login() {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const { email, password } = loginDetails;
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const userAuth = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: userAuth.user.displayName,
          photoUrl: userAuth.user.photoURL,
        })
      );
      localStorage.setItem("authToken", userAuth.user.accessToken);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-[92vh] bg-gray-200">
        <form
          className="flex flex-col justify-center items-center gap-4 shadow-md bg-slate-50 p-9 w-96 rounded-md"
          onSubmit={loginHandler}
        >
          <h1 className="text-xl font-semibold">Login</h1>
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
            Login
          </button>
          <p>
            <Link to="/signup" className="text-gray-500 font-semibold">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
