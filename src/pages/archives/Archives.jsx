import { Empty } from "pages/pages";
import { useSelector } from "react-redux";
import { Post } from "components/components";

export default function Archives() {
  const { user } = useSelector((state) => state.user);
  const posts = user?.archives;
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
