import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

export const loginService = async (enteredEmail, password) => {
  try {
    const {
      user: { displayName, photoURL, email, uid },
    } = await signInWithEmailAndPassword(auth, enteredEmail, password);
    return { displayName, photoURL, email, uid };
  } catch (e) {
    return e.message;
  }
};
