import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import { login, logout } from "./features/user/userSlice";
import { auth } from "./firebase/firebase";
import Router from "./Router/Router";

function App() {
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
      <Router />
    </div>
  );
}

export default App;
