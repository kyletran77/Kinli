import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { login, logout } from "features/user/userSlice";
import { auth } from "./firebase/firebase";
import Router from "Router/Router";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import RightSideBar from "components/RightSideBar";
import "App.css";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Header />
      {location.pathname !== "/login" && location.pathname !== "/signup" ? (
        <div className="flex bg-slate-100 justify-between">
          <Sidebar />
          <Router />
          <RightSideBar />
        </div>
      ) : (
        <Router />
      )}
    </div>
  );
}

export default App;
