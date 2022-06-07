import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  firebaseListeners,
  followingListener,
} from "./firebase/firebase-listeners";
import Router from "Router/Router";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import RightSideBar from "components/RightSideBar";
import "App.css";
import { auth } from "./firebase/firebase";

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
        followingListener(dispatch, user?.uid);
      }
    },
    // eslint-disable-next-line
    [currentUser]
  );

  return (
    <div className="App">
      <Header />
      {location.pathname !== "/login" && location.pathname !== "/signup" ? (
        <div className="flex bg-slate-100 justify-between min-h-screen">
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
