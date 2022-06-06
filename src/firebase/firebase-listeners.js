import { setAllPosts } from "features/allPosts/allPostsSlice";
import { login, logout } from "features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "./firebase";

export const firebaseListeners = (dispatch) => {
  authChangeListener(dispatch);
  postsListener(dispatch);
};

const authChangeListener = async (dispatch) => {
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
};

const postsListener = (dispatch) => {
  const q = query(collection(db, "allPosts"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    const allPostsList = snapshot.docs.map((doc) => doc.data());
    dispatch(setAllPosts(allPostsList));
  });
};
