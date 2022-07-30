import { useState } from "react";
import { FiEdit3, FiTrash, FiCheck, FiHeart } from "react-icons/fi";
import { RiInboxArchiveLine, RiInboxUnarchiveLine } from "react-icons/ri";
import { auth } from "../firebase/firebase";
import { Comment, Post, ExpImages } from "./components";
import { useSelector } from "react-redux";

// import { Post } from "./components";


export default function Entry({ post }) {
  const currentUser = auth?.currentUser;
  const { allUsers } = useSelector((state) => state.allUsers);
  const { allPosts } = useSelector((state) => state.allPosts);
  const { user } = useSelector((state) => state.user);

  

  const filteredPosts = allPosts?.filter(
    (exp) => exp.uid === currentUser?.uid & exp.company ==post?.company
  );

  return (
    <div className="relative mx-auto mt-0 mb-0 flex h-fit w-full min-w-[20rem] max-w-[90%] flex-col  p-4  sm:w-3/4 md:mx-auto md:w-3/4 lg:w-full">
        <header className="flex items-center gap-2">
          <img
            src={require("assets/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.webp")}
            alt=""
            className="aspect-square w-10 w-fit rounded-full object-cover "
          />

          <div class=" flex flex-col text-left font-semibold"> 
            <p classname = "text-lg">{post?.jobTitle}</p>
            <p className="text-sm sm:text-base font-semibold">{post?.company}</p>
            <p className="text-sm sm:text-base text-gray-500">{post?.workDates}</p>
            <p className="text-sm sm:text-base">{post?.description}</p>
            
          </div>
          
        </header>
        <div class="flex flex-row mx-10">
        {filteredPosts?.map((post) => (
          <ExpImages post={post} key={post?.postID} />
          ))}
        </div>
       
    </div>
  );
}
