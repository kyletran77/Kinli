import { useState } from "react";
import { auth } from "../firebase/firebase";
import { createPost } from "../firebase/firebase-calls";

export default function TextEditor() {
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

  const submitHandler = (e) => {
    e.preventDefault();
    createPost(currentUser, newPost);
    setNewPost(initialPostState);
  };

  return (
    <div className="grow flex flex-col gap-4 bg-gray-100 text-l  p-4 mx-auto w-full">
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
    </div>
  );
}
