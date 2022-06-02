import {
  addDoc,
  collection,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../features/allPosts/allPostsSlice";
import { auth, db } from "../firebase/firebase";
import Post from "./Post";

export default function TextEditor() {
  const { allPosts } = useSelector((state) => state.allPosts);
  const dispatch = useDispatch();

  const initialPostState = {
    author: "",
    uid: "",
    photoURL: "",
    email: "",
    caption: "",
    createdAt: "",
    imageURL: "",
    postID: "",
  };

  const [newPost, setNewPost] = useState(initialPostState);

  const currentUser = auth.currentUser;

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const allPostsRef = collection(db, "allPosts");

  const submitHandler = async (e) => {
    e.preventDefault();
    const document = await addDoc(allPostsRef, {
      author: currentUser.displayName,
      uid: currentUser.uid,
      photoURL: currentUser.photoURL,
      caption: newPost.caption,
      createdAt: new Date().toLocaleString(),
      imageURL: newPost.imageURL,
    });

    await setDoc(
      doc(allPostsRef, document.id),
      {
        postID: document.id,
      },
      { merge: true }
    );
    setNewPost(initialPostState);
  };

  // to-do: use in user profile
  const filteredPosts = allPosts.filter(
    (post) => post.uid === currentUser?.uid
  );

  // to-do: use in user profile
  const updateUserPosts = async () => {
    const userPostsRef = doc(db, "users", currentUser.uid);
    await updateDoc(userPostsRef, { posts: filteredPosts });
  };

  useEffect(
    () =>
      onSnapshot(allPostsRef, (snapshot) => {
        const allPostsList = snapshot.docs.map((doc) => doc.data());
        dispatch(setAllPosts(allPostsList));
        if (currentUser) updateUserPosts();
      }),
    // eslint-disable-next-line
    [currentUser]
  );

  return (
    <div className="grow flex flex-col gap-4 bg-gray-100 text-l min-h-screen p-4 mx-auto">
      <form
        className="mx-auto w-full max-w-3xl relative"
        onSubmit={(e) => submitHandler(e)}
      >
        <textarea
          rows="6"
          placeholder="What's on your mind?"
          className="rounded-sm w-full bg-gray-50 outline-none border-0 shadow-md p-4"
          name="caption"
          value={newPost.caption}
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="insert image URL"
          name="imageURL"
          value={newPost.imageURL}
          className="absolute left-2 bottom-4 px-3"
          onChange={inputHandler}
        />
        <button className="border-none bg-blue-500 text-gray-100 rounded-md px-4 py-1 absolute right-2 bottom-4 text-base">
          Post
        </button>
      </form>
      <div>
        {allPosts?.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </div>
  );
}
