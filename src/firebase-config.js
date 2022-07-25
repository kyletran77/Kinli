import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  apiKey: "AIzaSyBYRU9yWNQzThzh6P7MuxVyhVbCGGj_AQs",
  authDomain: "jooby-b9791.firebaseapp.com",
  projectId: "jooby-b9791",
  storageBucket: "jooby-b9791.appspot.com",
  messagingSenderId: "39659342369",
  appId: "1:39659342369:web:103c895c5b72cc17e47160",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
