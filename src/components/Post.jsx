import {
  AiOutlineHeart,
  AiOutlineSend,
  AiOutlineComment,
} from "react-icons/ai";
import { auth } from "../firebase/firebase";

export default function Post({ post }) {
  return (
    <div className="mx-auto w-full max-w-3xl h-fit mt-2 mb-8 bg-gray-50 shadow-md p-4 rounded-lg">
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
        <p className="text-base text-gray-600 pl-11">{post.caption}</p>
        {post.imageURL && (
          <img
            src={post.imageURL}
            alt="post-one"
            className="mx-auto aspect-auto max-h-96 mt-2"
          />
        )}
        <footer className="flex gap-3 text-gray-500 text-2xl justify-end mt-2">
          <AiOutlineHeart />
          <AiOutlineSend />
          <AiOutlineComment />
        </footer>
      </div>
    </div>
  );
}
