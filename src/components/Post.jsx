import {
  AiOutlineHeart,
  AiOutlineSend,
  AiOutlineComment,
} from "react-icons/ai";
import { auth } from "../firebase/firebase";

export default function Post({ post }) {
  return (
    <div className="mt-2 mb-8 ">
      <div className="mx-auto w-full max-w-3xl h-fit bg-gray-50 shadow-md p-4 rounded-lg">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-center">
            <img
              src={
                post.uid === auth.currentUser.uid
                  ? auth.currentUser.photoURL
                  : "http://cdn.onlinewebfonts.com/svg/img_264570.png"
              }
              alt="user-dp"
              className="h-9 w-9 rounded-full aspect-square "
            />

            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-sm font-semibold">{post.author}</p>
              </div>
            </div>
          </div>

          {post.imageURL && (
            <img
              src={post.imageURL}
              alt="post-one"
              className="mx-auto aspect-auto max-h-96"
            />
          )}
          <p className="text-base text-gray-500">{post.caption}</p>
          <div className="flex gap-3 text-gray-500 text-2xl justify-end">
            <AiOutlineHeart />
            <AiOutlineSend />
            <AiOutlineComment />
          </div>
        </div>
      </div>
    </div>
  );
}
