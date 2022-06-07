import {
  deletePost,
  dislikePost,
  editPost,
  likePost,
  postComment,
} from "../firebase/firebase-calls";
import { useState } from "react";
import { FiEdit3, FiTrash, FiCheck, FiHeart } from "react-icons/fi";
import { FaHeart, FaRegCommentAlt } from "react-icons/fa";
import { auth } from "../firebase/firebase";
import Comment from "./Comment";
import { useSelector } from "react-redux";

export default function Post({ post }) {
  const currentUser = auth.currentUser;
  const { allUsers } = useSelector((state) => state.allUsers);
  const [enableEdit, setEnableEdit] = useState(false);
  const [enableComments, setEnableComments] = useState(false);
  const [comment, setComment] = useState("");
  const [updatePost, setUpdatePost] = useState({
    caption: post.caption,
    imageURL: post.imageURL,
  });

  const editPostHandler = () => {
    editPost(post, updatePost);
    setEnableEdit(false);
  };

  const toggleLike = ({ likes, postID }) => {
    const userExists = likes?.some((user) => user.userID === currentUser.uid);
    userExists
      ? dislikePost(postID, currentUser)
      : likePost(postID, currentUser);
  };

  return (
    <div className="mx-auto w-full max-w-3xl h-fit mt-2 mb-8 bg-gray-50 shadow-md p-4 rounded-lg relative flex flex-col">
      <header className="flex gap-2 items-center">
        <img
          src={allUsers?.find((user) => user.userID === post.uid)?.avatar}
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
          <p className="text-base text-gray-600 pl-11">{updatePost.caption}</p>
          {updatePost.imageURL && (
            <img
              src={updatePost.imageURL}
              alt="post-one"
              className="mx-auto aspect-auto max-h-96 mt-2"
            />
          )}
        </div>
      )}

      {post.uid === currentUser?.uid && (
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

      <div className="flex items-center gap-3 text-gray-500 justify-start mt-5 pl-11">
        <div className="flex items-center gap-2 text-lg">
          {post?.likes?.find((user) => user.userID === currentUser.uid) ? (
            <button onClick={() => toggleLike(post)}>
              <FaHeart className="text-red-700" />
            </button>
          ) : (
            <button onClick={() => toggleLike(post)}>
              <FiHeart />
            </button>
          )}
          {post?.likes?.length > 0 && post.likes.length}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setEnableComments((prev) => !prev)}>
            <FaRegCommentAlt />
          </button>
          {post?.comments?.length > 0 && post.comments.length}
        </div>
      </div>

      {enableComments && (
        <footer>
          <div className="w-full relative px-1">
            <textarea
              placeholder="Drop a comment.."
              className="px-2 py-2 mt-2 focus:outline-none bg-gray-100 text-sm resize-none w-full"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="border-none bg-blue-500 text-gray-100 rounded-md px-3 py-1 absolute right-4 bottom-1/2 translate-y-1/2 text-sm"
              onClick={() => {
                postComment(post, comment, currentUser);
                setComment("");
              }}
            >
              Post
            </button>
          </div>
          {post?.comments?.map((comment) => (
            <Comment comment={comment} post={post} key={comment} />
          ))}
        </footer>
      )}
    </div>
  );
}
