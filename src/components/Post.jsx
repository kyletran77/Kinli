import { deletePost, editPost } from "../firebase/firebase-calls";
import { useState } from "react";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { FiEdit3, FiTrash, FiCheck } from "react-icons/fi";
import { auth } from "../firebase/firebase";

export default function Post({ post }) {
  const [enableEdit, setEnableEdit] = useState(false);
  const [updatePost, setUpdatePost] = useState({
    caption: post.caption,
    imageURL: post.imageURL,
  });

  const editPostHandler = () => {
    editPost(post, updatePost);
    setEnableEdit(false);
  };

  return (
    <div className="mx-auto w-full max-w-3xl h-fit mt-2 mb-8 bg-gray-50 shadow-md p-4 rounded-lg relative">
      <div className="flex flex-col">
        <header className="flex gap-2 items-center">
          <img
            src={
              post.uid === auth.currentUser.uid
                ? auth.currentUser.photoURL
                : "http://cdn.onlinewebfonts.com/svg/img_264570.png"
            }
            alt="user-dp"
            className="h-9 w-9 rounded-full aspect-square "
          />
          <p className="font-semibold">{post.author}</p>
        </header>

        {enableEdit ? (
          <div className="flex flex-col ">
            <textarea
              value={updatePost.caption}
              className="ml-10 pl-1 focus:outline-none"
              onChange={(e) =>
                setUpdatePost((prev) => ({ ...prev, caption: e.target.value }))
              }
            />
            <input
              value={updatePost.imageURL}
              placeholder="Add image URL here"
              className="ml-10 pl-1 focus:outline-none"
              onChange={(e) =>
                setUpdatePost((prev) => ({
                  ...prev,
                  imageURL: e.target.value,
                }))
              }
            />
            {updatePost.imageURL && (
              <img
                src={updatePost.imageURL}
                alt="post-one"
                className="mx-auto aspect-auto max-h-96 mt-2"
              />
            )}
          </div>
        ) : (
          <div>
            <p className="text-base text-gray-600 pl-11">
              {updatePost.caption}
            </p>
            {updatePost.imageURL && (
              <img
                src={updatePost.imageURL}
                alt="post-one"
                className="mx-auto aspect-auto max-h-96 mt-2"
              />
            )}
          </div>
        )}

        {post.uid === auth.currentUser.uid && (
          <div className="flex absolute top-5 right-5 gap-4 text-gray-600">
            {enableEdit ? (
              <button onClick={() => editPostHandler(post, updatePost)}>
                <FiCheck />
              </button>
            ) : (
              <button onClick={() => setEnableEdit((prev) => !prev)}>
                <FiEdit3 />
              </button>
            )}

            <button onClick={() => deletePost(post)}>
              <FiTrash />
            </button>
          </div>
        )}
        <footer className="flex gap-3 text-gray-500 text-2xl justify-start mt-5 pl-11">
          <AiOutlineHeart />
          <AiOutlineComment />
        </footer>
      </div>
    </div>
  );
}
