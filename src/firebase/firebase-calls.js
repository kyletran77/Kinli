import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const allPostsCollection = collection(db, "allPosts");
const usersCollection = collection(db, "users");

export const getUser = async (user, setUserData) => {
  const userDoc = doc(usersCollection, user.uid);
  const docSnap = await getDoc(userDoc);
  setUserData(docSnap.data());
};

export const createPost = async (user, post) => {
  const postDoc = await addDoc(allPostsCollection, {
    author: user.displayName,
    uid: user.uid,
    photoURL: user.photoURL,
    caption: post.caption,
    createdAt: new Date().toLocaleString(),
    imageURL: post.imageURL,
  });

  await setDoc(
    doc(allPostsCollection, postDoc.id),
    {
      postID: postDoc.id,
    },
    { merge: true }
  );
};

export const editPost = async (post, updatePost) => {
  await setDoc(
    doc(allPostsCollection, post.postID),
    {
      caption: updatePost.caption,
      imageURL: updatePost.imageURL,
    },
    { merge: true }
  );
};

export const deletePost = async (post) => {
  await deleteDoc(doc(allPostsCollection, post.postID));
};
