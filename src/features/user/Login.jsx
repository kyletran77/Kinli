import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userLogin } from "../../firebase/firebase-calls";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const testLogin = { email: "theHippogriff@gmail.com", password: "buckbeak" };
  const { email, password } = loginDetails;
  let lastLocation = location.state?.from?.pathname || "/";
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const loginHandler = (e) => {
    e.preventDefault();
    userLogin(email, password, dispatch, lastLocation, navigate);
  };

  const testLoginHandler = (e, { email, password }) => {
    e.preventDefault();
    setLoginDetails(testLogin);
    userLogin(email, password, dispatch, lastLocation, navigate);
  };

  return (
    <div className="flex justify-center items-center h-[92vh] bg-gray-200">
      <form
        className="flex flex-col h-96 justify-center items-center gap-4 shadow-md bg-slate-50 p-9 w-96 rounded-md"
        onSubmit={loginHandler}
      >
        <h1 className="text-xl font-semibold">Login</h1>
        <input
          type="email"
          name="email"
          value={email}
          className="w-full p-2 h-9 bg-gray-100"
          placeholder="Enter email"
          required
          onChange={changeHandler}
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
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
        <div className="flex w-full gap-2 mt-4">
          <button
            type="submit"
            className="border-2 bg-gray-200 py-1 px-4 rounded-md w-1/2"
          >
            Login
          </button>
          <div
            role="button"
            className="border-2 bg-gray-200 py-1 px-4 rounded-md w-1/2 text-center"
            onClick={(e) => testLoginHandler(e, testLogin)}
          >
            Test User
          </div>
        </div>
        <p>
          <Link to="/signup" className="text-gray-500 font-semibold">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}
