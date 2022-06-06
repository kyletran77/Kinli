import { setAllPosts } from "features/allPosts/allPostsSlice";
import { usersList } from "features/allUsers/usersSlice";
import { login, logout } from "features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "./firebase";

export const firebaseListeners = (dispatch) => {
  authChangeListener(dispatch);
  postsListener(dispatch);
  usersListener(dispatch);
};

const authChangeListener = (dispatch) => {
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

const usersListener = (dispatch) => {
  onSnapshot(collection(db, "users"), (snapshot) => {
    const allUsersList = snapshot.docs.map((doc) => doc.data());
    dispatch(usersList(allUsersList));
  });
};

const postsListener = (dispatch) => {
  const q = query(collection(db, "allPosts"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    const allPostsList = snapshot.docs.map((doc) => doc.data());
    dispatch(setAllPosts(allPostsList));
  });
};
