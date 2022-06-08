import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const allPostsCollection = collection(db, "allPosts");
const usersCollection = collection(db, "users");
const date = new Date().toLocaleDateString("en-IN", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export const getUser = async (user, setUserData) => {
  const userDoc = doc(usersCollection, user?.uid);
  const docSnap = await getDoc(userDoc);
  if (docSnap.exists()) {
    setUserData(docSnap.data());
  } else {
    console.log("Could not retrieve user data");
  }
};

export const createPost = async (user, post) => {
  const postDoc = await addDoc(allPostsCollection, {
    author: user.displayName,
    uid: user.uid,
    photoURL: user.photoURL,
    caption: post.caption,
    createdAt: new Date().toLocaleString(),
    imageURL: post.imageURL,
    likes: [],
    comments: [],
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

export const likePost = async (postID, user) => {
  await setDoc(
    doc(allPostsCollection, postID),
    {
      likes: arrayUnion({
        avatar: user.photoURL,
        displayName: user.displayName,
        userID: user.uid,
      }),
    },
    { merge: true }
  );
};

export const dislikePost = async (postID, user) => {
  await setDoc(
    doc(allPostsCollection, postID),
    {
      likes: arrayRemove({
        avatar: user.photoURL,
        displayName: user.displayName,
        userID: user.uid,
      }),
    },
    { merge: true }
  );
};

export const postComment = async ({ postID }, comment, user) => {
  await setDoc(
    doc(allPostsCollection, postID),
    {
      comments: arrayUnion({
        avatar: user.photoURL,
        displayName: user.displayName,
        userID: user.uid,
        comment: comment,
        date: date,
      }),
    },
    { merge: true }
  );
};

export const deleteComment = async (post, comment) => {
  await setDoc(
    doc(allPostsCollection, post.postID),
    {
      comments: arrayRemove(comment),
    },
    { merge: true }
  );
};

export const followUser = async (currentUser, userToFollow) => {
  try {
    await setDoc(
      doc(collection(db, "users"), currentUser?.uid),
      {
        following: arrayUnion(userToFollow.userID),
      },
      { merge: true }
    );
    await setDoc(
      doc(collection(db, "users"), userToFollow.userID),
      {
        followers: arrayUnion(currentUser?.uid),
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const unfollowUser = async (currentUser, userToUnfollow) => {
  try {
    await setDoc(
      doc(collection(db, "users"), currentUser?.uid),
      {
        following: arrayRemove(userToUnfollow.userID),
      },
      { merge: true }
    );

    await setDoc(
      doc(collection(db, "users"), userToUnfollow.userID),
      {
        followers: arrayRemove(currentUser?.uid),
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const archivePost = async (post, user) => {
  await setDoc(
    doc(collection(db, "users"), user?.uid),
    {
      archives: arrayUnion(post),
    },
    { merge: true }
  );
  deletePost(post);
};

export const unarchivePost = async (post, user) => {
  await setDoc(
    doc(collection(db, "users"), user?.uid),
    {
      archives: arrayRemove(post),
    },
    { merge: true }
  );
  await setDoc(doc(allPostsCollection, post.postID), post, { merge: true });
};

export const bookmarkPost = async (post, user) => {
  await setDoc(
    doc(collection(db, "users"), user?.uid),
    {
      bookmarks: arrayUnion(post),
    },
    { merge: true }
  );
};

export const undoBookmarkPost = async (post, user) => {
  await setDoc(
    doc(collection(db, "users"), user?.uid),
    {
      bookmarks: arrayRemove(post),
    },
    { merge: true }
  );
};
