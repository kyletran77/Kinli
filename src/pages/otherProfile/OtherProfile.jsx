import { useSelector } from "react-redux";
import Post from "components/Post";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { followUser, unfollowUser } from "../../firebase/firebase-calls";

export default function OtherProfile() {
  const { profileID } = useParams();
  const { user } = useSelector((state) => state.user);
  const { allUsers } = useSelector((state) => state.allUsers);
  const { allPosts } = useSelector((state) => state.allPosts);
  const otherUser = allUsers?.find((user) => user?.userID === profileID);

  const filteredPosts = allPosts?.filter(
    (post) => post.uid === otherUser?.userID
  );

  const handleFollow = (currentUser, otherUser) => {
    const isFollowing = user?.following?.some(
      (user) => user === otherUser?.userID
    );
    isFollowing
      ? unfollowUser(currentUser, otherUser)
      : followUser(currentUser, otherUser);
  };
  return (
    <div className="w-full pt-4 ml-3">
      <section className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 h-72 relative">
        <img
          src={otherUser?.coverPic}
          alt="cover"
          className="w-full h-fit max-h-72 object-cover mx-auto"
        />
        <div className="w-80 h-fit mx-auto bg-slate-50  absolute right-1/2 translate-x-1/2 -bottom-1/2 rounded-lg shadow flex flex-col items-center py-3 px-2 gap-2 md:w-1/3 lg:w-1/2">
          <img
            src={otherUser?.avatar}
            alt="user-dp"
            className="h-24 w-fit object-cover md:h-32 aspect-square rounded-full"
          />
          <p className="text-lg font-semibold">{otherUser?.displayName}</p>
          <p className="text-center">{otherUser?.bio}</p>
          <p>{otherUser?.website}</p>
          <div className="absolute right-5 top-5">
            {user?.following?.some((id) => id === otherUser?.userID) ? (
              <button
                className="border-2 border-transparent bg-blue-200 rounded-full py-1 px-2 text-sm text-gray-700"
                onClick={() => handleFollow(auth?.currentUser, otherUser)}
              >
                Following
              </button>
            ) : (
              <button
                className="border-2  border-transparent bg-blue-500 rounded-full py-1 px-2 text-sm text-gray-50"
                onClick={() => handleFollow(auth?.currentUser, otherUser)}
              >
                Follow
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1 justify-center md:w-full md:gap-1  md:justify-center text-slate-50 lg:scale-100 px-2 md:px-0 lg:gap-5">
            <div className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full px-3 py-1">
              {otherUser?.followers?.length} Followers
            </div>
            <div className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full px-3 py-1">
              {otherUser?.following?.length} Following
            </div>
            <div className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full px-3 py-1">
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
