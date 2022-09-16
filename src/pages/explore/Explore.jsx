import { Post } from "components/components";
import { Empty } from "pages/pages";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Explore() {
  const { allPosts } = useSelector((state) => state.allPosts);
  const [sortBy, setSortBy] = useState("Latest");

  const sortHandler = () => {
    switch (sortBy) {
      case "Latest":
        return [...allPosts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
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
    <div className="mt-2 flex w-full flex-col sm:mx-2 sm:gap-2 md:mx-2 md:gap-2">
      <select
        className="w-fit self-center bg-white rounded-md py-1 px-3 focus:outline focus:outline-2 focus:outline-blue-400"
        onChange={(e) => setSortBy(e.target.value)}
        value={sortBy}
      >
        <option value="Latest">Latest</option>
        <option value="Oldest">Oldest</option>
        <option value="Trending">Trending</option>
      </select>
      <div className="md:mb-16">
        {posts?.length > 0 ? (
          posts?.map((post) => <Post post={post} key={post.postID} />)
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}
