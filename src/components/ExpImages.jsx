import { auth } from "../firebase/firebase";
import { useSelector } from "react-redux";


export default function ExpImages({ post }) {
  const currentUser = auth?.currentUser;
  const { allUsers } = useSelector((state) => state.allUsers);
  const { user } = useSelector((state) => state.user);

  return (

        <div className="flex h-40 w-30 mx-1 my-3  object-cover">
        <img
              src={post?.imageURL}
              alt="post-one"
              className="object-cover h-20 w-40"
            />
        </div>
        
  );
}
