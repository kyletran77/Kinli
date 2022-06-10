import { Post } from "components/components";
import { Empty } from "pages/pages";
import { useSelector } from "react-redux";

export default function Bookmarks() {
  const { user } = useSelector((state) => state.user);

  const posts = user?.bookmarks;
  return (
    <div className="mt-2 flex w-full flex-col">
      {posts?.length > 0 ? (
        posts?.map((post) => <Post post={post} key={post.postID} />)
      ) : (
        <Empty />
      )}
    </div>
  );
}
