import { useSelector } from "react-redux";
import { Post } from "components/components";
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
    <div className="ml-0 w-full pt-4 lg:ml-3">
      <section className="relative h-72 w-full">
        <img
          src={otherUser?.coverPic}
          alt="cover"
          className="mx-auto h-fit max-h-72 w-full object-cover"
        />
        <div className="absolute right-1/2 -bottom-1/2 mx-auto  flex h-fit w-80 translate-x-1/2 flex-col items-center gap-2 rounded-lg bg-slate-50 py-3 px-2 shadow sm:top-3/4 sm:w-96 md:w-96 lg:top-3/4 lg:w-96">
          <img
            src={otherUser?.avatar}
            alt="user-dp"
            className="aspect-square h-24 w-fit rounded-full object-cover md:h-32 lg:h-16"
          />
          <p className="text-lg font-semibold">{otherUser?.displayName}</p>
          <p className="text-center text-sm sm:text-base">{otherUser?.bio}</p>
          <p className="text-sm sm:text-base">{otherUser?.website}</p>
          <p className="text-sm sm:text-base">Status:{otherUser?.status}</p>
          <div className="absolute right-5 top-5">
            {user?.following?.some((id) => id === otherUser?.userID) ? (
              <button
                className="rounded-full border-2 border-transparent bg-blue-200 py-1 px-2 text-sm text-gray-700"
                onClick={() => handleFollow(auth?.currentUser, otherUser)}
              >
                Following
              </button>
            ) : (
              <button
                className="rounded-full  border-2 border-transparent bg-blue-500 py-1 px-2 text-sm text-gray-50"
                onClick={() => handleFollow(auth?.currentUser, otherUser)}
              >
                Follow
              </button>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-1 px-2 text-slate-50 sm:gap-2 md:w-full md:justify-center md:gap-3 md:px-0 lg:scale-100 lg:gap-5">
            <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1">
              {otherUser?.followers?.length} Followers
            </div>
            <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1">
              {otherUser?.following?.length} Following
            </div>
            <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1">
              {filteredPosts?.length} Posts
            </div>
          </div>
        </div>
      </section>
      <ul className="mt-44 mb-16 sm:mb-24 md:mb-24 lg:mt-36 xl:mt-44">
        {filteredPosts?.map((post) => (
          <Post post={post} key={post.postID} />
        ))}
      </ul>
    </div>
  );
}
