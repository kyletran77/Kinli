import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userLogin } from "../../firebase/firebase-calls";
import { auth, provider} from "../../firebase/firebase"
import { signInWithPopup } from "firebase/auth";
import HeroHome from "../../pages/landing/partials/HeroHome"
import FeaturesHome from "../../pages/landing/partials/Features"
import Testimonials from "pages/landing/partials/Testimonials";
import CircleFeatures from "pages/landing/partials/CircleFeatures";
import Footer from "pages/landing/partials/Footer";
// import { signInWithGoogle } from "../../firebase/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";


export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const analytics = getAnalytics();
  logEvent(analytics, 'visit_landing');
  console.log("landed");

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  

  const testLogin = { email: "kinlitest@gmail.com", password: "password" };
  const { email, password } = loginDetails;
  const lastLocation = location.state?.from?.pathname || "/";
  

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };
  const loginClick = (e) =>{
    console.log("click");
    setShowLogin(true);
  }
  const loginHandler = (e) => {
    e.preventDefault();
    userLogin(email, password, dispatch, lastLocation, navigate);
  };

  const testLoginHandler = (e, { email, password }) => {
    e.preventDefault();
    setLoginDetails(testLogin);
    userLogin(email, password, dispatch, lastLocation, navigate);
  };
  // Sign in with google
  const signin = () => {
    signInWithPopup(auth, provider)
    .catch(alert)
    .then(
      function (result) {
           var token = result.credential.accessToken;
           var user = result.user;
           //this is what you need
           var isNewUser = result.additionalUserInfo.isNewUser;
           if (isNewUser) {
              
           } else {
                // your sign in flow
                console.log('user ' + user.email + ' does exist!');
           }
      }).catch(function (error) {
      // Handle Errors here.
 
 });
 
}


  return (
    <div className="flex justify-center bg-white">
      {/* <center>
                <button style={{"marginTop" : "200px"}} 
                onClick={signin}>Sign In with Google</button>
            </center> */}
      {(showLogin) ? (<form
        className="flex h-96 w-80 flex-col items-center justify-center gap-4 rounded-md bg-slate-50 p-9 shadow-md sm:w-96"
        onSubmit={loginHandler}
      >
        <h1 className="text-xl font-semibold">Login</h1>
        <input
          type="email"
          name="email"
          value={email}
          className="h-9 w-full bg-gray-100 p-2"
          placeholder="Enter email"
          required
          onChange={changeHandler}
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
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
        <div className="mt-4 flex w-full gap-2">
          <button
            type="submit"
            className="w-1/2 text-lg rounded-md border-2 bg-gray-200 py-1 px-4"
          >
            Login
          </button>
          <div
            role="button"
            className="w-1/2 text-lg rounded-md border-2 bg-gray-200 py-1 px-4 text-center"
            onClick={(e) => testLoginHandler(e, testLogin)}
          >
            Test User
          </div>
        </div>
        <p>
        <div>
      {/* <button className="button" onClick={signInWithGoogle}>Sign in with google</button> */}
    </div>
          <Link to="/signup" className="font-semibold text-gray-500">
            Create Account
          </Link>
        </p>
      </form>): (
        <div className="mt-0 flex flex-col overflow-hidden w-full">
          <main className="flex-grow">
            <HeroHome />
            <CircleFeatures/>
            <Footer/>
            {/* <FeaturesHome setShowLogin={loginClick}/> */}
            {/* <Testimonials/> */}
          </main>
        <div className="w-full flex flex-col p-4">
          <button type="button" class=" text-white text-center md:w-1/2 md:mx-auto font-bold bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={()=>setShowLogin(true)}
                >Login
          </button>
        </div>
      </div>
      

      )
      }
    </div>
  );
}
