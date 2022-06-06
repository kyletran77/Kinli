import { auth } from "../firebase/firebase";
import { FiTrash } from "react-icons/fi";
import { deleteComment } from "../firebase/firebase-calls";

export default function Comment({ comment, post }) {
  const currentUser = auth.currentUser;
  return (
    <div className="flex flex-col bg-blue-50 my-1 p-2 rounded-md relative gap-1">
      <div className="flex gap-2">
        <img src={comment.avatar} alt="commenter-dp" className="h-6" />
        <p className="text-sm font-semibold">{comment.displayName}</p>
      </div>
      <p className="ml-8 text-gray-700">{comment.comment}</p>
      <p className="ml-8 text-gray-500 text-xs ">{comment.date}</p>

      {comment.userID === currentUser.uid && (
        <button
          className="absolute right-5 top-4 text-sm"
          onClick={() => deleteComment(post, comment)}
        >
          <FiTrash />
        </button>
      )}
    </div>
  );
}
