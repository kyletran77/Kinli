import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { Header, Sidebar, RightSideBar } from "components/components";
import {
  firebaseListeners,
  userDataListeners,
} from "./firebase/firebase-listeners";
import Router from "Router/Router";
import "App.css";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const currentUser = auth?.currentUser;

  useEffect(
    () => {
      firebaseListeners(dispatch);
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      if (currentUser) {
        userDataListeners(dispatch, user?.uid);
      }
    },
    // eslint-disable-next-line
    [currentUser]
  );

  return (
    <div className="App">
      <Header />
      {location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/aboutLaunch" && location.pathname !== "/leader"? (

        <div className="flex min-h-screen justify-between bg-slate-100">
          <Sidebar />
          <Router />
        </div>
      ) : (
        <Router />
      )}
      <Toaster />
    </div>
  );
}

export default App;
