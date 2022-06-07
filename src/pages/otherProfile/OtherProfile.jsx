import { useSelector } from "react-redux";
import Post from "components/Post";
import { useParams } from "react-router-dom";

export default function OtherProfile() {
  const { profileID } = useParams();
  const { allUsers } = useSelector((state) => state.allUsers);
  const { allPosts } = useSelector((state) => state.allPosts);
  const otherUser = allUsers?.find((user) => user?.userID === profileID);

  const filteredPosts = allPosts?.filter(
    (post) => post.uid === otherUser?.userID
  );

  const gradients = [
    "bg-gradient-to-r from-cyan-500 to-blue-500",
    "bg-gradient-to-r from-sky-500 to-indigo-500",
    "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    "bg-gradient-to-r from-yellow-500 to-red-500",
    "bg-gradient-to-r from-green-500 to-green-800",
    "bg-gradient-to-r from-blue-500 to-blue-800",
  ];

  const randomGradient =
    gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div className="w-full pt-4 ml-3">
      <section className={`w-full ${randomGradient} h-72 relative`}>
        {otherUser?.coverPic && (
          <img
            src={otherUser?.coverPic}
            alt="cover"
            className="w-full h-fit max-h-72 object-cover mx-auto"
          />
        )}
        <div className="w-80 h-fit mx-auto bg-slate-50  absolute right-1/2 translate-x-1/2 -bottom-1/2 rounded-lg shadow flex flex-col items-center py-3 px-2 gap-2 md:w-1/3 lg:w-1/2">
          <img
            src={otherUser?.avatar}
            alt="user-dp"
            className="h-24 md:h-32 w-fit object-cover aspect-square rounded-full"
          />
          <p className="text-lg font-semibold">{otherUser?.displayName}</p>
          <p className="text-center">{otherUser?.bio}</p>
          <p>{otherUser?.website}</p>
          <div className="flex flex-wrap gap-1 justify-center md:w-full md:gap-1  md:justify-center text-slate-50 lg:scale-100 px-2 md:px-0 lg:gap-5">
            <div className={`${randomGradient} rounded-full px-3 py-1`}>
              {otherUser?.followers?.length} Followers
            </div>
            <div className={`${randomGradient} rounded-full px-3 py-1`}>
              {otherUser?.following?.length} Following
            </div>
            <div className={`${randomGradient} rounded-full px-3 py-1`}>
              {filteredPosts?.length} Posts
            </div>
          </div>
        </div>
      </section>
      <ul className="mt-44">
        {filteredPosts?.map((post) => (
          <Post post={post} key={post.postID} />
        ))}
      </ul>
    </div>
  );
}
