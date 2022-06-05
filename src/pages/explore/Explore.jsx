import Post from "components/Post";
import TextEditor from "components/TextEditor";
import { useSelector } from "react-redux";

export default function Explore() {
  const { allPosts } = useSelector((state) => state.allPosts);

  return (
    <div className="flex flex-col w-full">
      <TextEditor />
      <div>
        {allPosts?.map((post) => (
          <Post post={post} key={post.postID} />
        ))}
      </div>
    </div>
  );
}
