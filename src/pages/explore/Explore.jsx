import Post from "components/Post";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Explore() {
  const { allPosts } = useSelector((state) => state.allPosts);
  const [sortBy, setSortBy] = useState("Latest");

  const sortHandler = () => {
    switch (sortBy) {
      case "Latest":
        return allPosts;
      case "Oldest":
        return [...allPosts].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "Trending":
        return [...allPosts].sort((a, b) => b.likes?.length - a.likes?.length);
      default:
        return allPosts;
    }
  };

  const posts = sortHandler(allPosts);

  return (
    <div className="flex flex-col w-full mt-2">
      <select
        className="py-1 px-3 w-fit self-center mr-10 rounded-md focus:outline focus:outline-2 focus:outline-blue-400"
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
