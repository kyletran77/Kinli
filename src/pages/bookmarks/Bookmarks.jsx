import Post from "components/Post";
import { useSelector } from "react-redux";

export default function Bookmarks() {
  const { user } = useSelector((state) => state.user);

  const posts = user?.bookmarks;
  return (
    <div className="flex flex-col w-full mt-2">
      {posts?.map((post) => (
        <Post post={post} key={post.postID} />
      ))}
    </div>
  );
}
