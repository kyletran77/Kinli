import Post from "components/Post";
import React from "react";
import { useSelector } from "react-redux";

export default function Archives() {
  const { user } = useSelector((state) => state.user);
  const posts = user?.archives;
  return (
    <div className="flex flex-col w-full mt-2">
      {posts?.map((post) => (
        <Post post={post} key={post.postID} />
      ))}
    </div>
  );
}
