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
import Schedule from 'react-schedule-job'
import 'react-schedule-job/dist/index.css'
import { updateDiamonds } from "./firebase/firebase-calls";


function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const {allCircles} = useSelector((state) => state.allCircles)
  const currentUser = auth?.currentUser;
      
  const function_1 = () => {
    allCircles.map((circle)=>
    { 
      const engagement = circle.engagement;
      var updatedDiamond = circle.diamondCount;

      if (engagement ==1) updatedDiamond += 3;
      if (engagement >= 0.75) updatedDiamond += 2;
      if (engagement >= 0.5) updatedDiamond += 1;

      updateDiamonds(circle.circleID, updatedDiamond, circle.engagement);



    })
  }
  ;
    

      
  const jobs = [
        {
          fn: function_1,
          id: '1',
          schedule: '0 0,23 * * *',
        }
      ]
    

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
      <Schedule 
        jobs={jobs}
        timeZone='UTC'
        dashboard={{ hidden: false }}
      />
    </div>
  );
}

export default App;
