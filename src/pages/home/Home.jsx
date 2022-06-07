import Post from "components/Post";
import TextEditor from "components/TextEditor";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { user } = useSelector((state) => state.user);
  const { allPosts } = useSelector((state) => state.allPosts);
  const [sortBy, setSortBy] = useState("Latest");
  const followingUsers = user?.following;

  const filteredPosts = allPosts?.filter(
    (post) => followingUsers?.includes(post.uid) || post.uid === user?.uid
  );

  const sortHandler = () => {
    switch (sortBy) {
      case "Latest":
        return filteredPosts;
      case "Oldest":
        return [...filteredPosts].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "Trending":
        return [...filteredPosts].sort(
          (a, b) => b.likes?.length - a.likes?.length
        );
      default:
        return filteredPosts;
    }
  };

  const posts = sortHandler(filteredPosts);

  return (
    <div className="flex flex-col w-full">
      <TextEditor />
      <select
        className="py-1 px-3 w-fit self-center mr-11 rounded-md focus:outline focus:outline-2  focus:outline-blue-400"
        onChange={(e) => setSortBy(e.target.value)}
        value={sortBy}
      >
        <option value="Latest">Latest</option>
        <option value="Oldest">Oldest</option>
        <option value="Trending">Trending</option>
      </select>

      <div>
        {posts?.map((post) => (
          <Post post={post} key={post.postID} />
        ))}
      </div>
    </div>
  );
}
