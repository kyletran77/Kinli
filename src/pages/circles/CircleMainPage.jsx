import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit3 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { joinCircle, getCircle, getUser } from "../../firebase/firebase-calls";
//import EditProfileModal from "./EditProfileModal";
import { Post } from "components/components";
import { current } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";
import { navLinks } from "utils/Constants";
import { circleNav } from "utils/Constants";

import { FaUserCircle } from "react-icons/fa";

export default function CircleMainPage() {
  const { circleID } = useParams();
  const { user } = useSelector((state) => state.user);
  const { allPosts } = useSelector((state) => state.allPosts);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const {allCircles} = useSelector((state) => state.allCircles)
  const otherCircle = allCircles?.find((circle) => circle?.circleID == circleID)
  const currentUser = auth?.currentUser;
  const [circleData, setCircleData] = useState([]);



  const filteredPosts = allPosts?.filter(
    (post) => post.uid
  );
  
  useEffect(
    () => {
       if (currentUser) getUser(currentUser, setUserData);
    },
    // eslint-disable-next-line
    [userData]
  );


  useEffect(
    () => {
       if (otherCircle) getCircle(otherCircle?.circleID, setCircleData);
    },
    // eslint-disable-next-line
    [circleData]
  );

  return (
      <div className="ml-0 w-full pt-4 sm:ml-0 md:ml-0 lg:ml-3">
        <section>

        {/* Horizontal story flex container*/} 
          <div class="flex-row p-6 w-5/6 justify-center">
            {/* Wrap button in a div to not conflict with flex 
            <div className="space-y-12">
                <button className="btn">
                    <div className="">
                        <img className="" src="http://localhost:3000/static/media/avatar_03.29ac6c4071291083beb4.webp" alt="not found" />
                    </div>   
                </button>    
                <h3 className="text-bold">Kevin Tran</h3>     
            </div>

            <div className="space-y-12">
                <button className="btn">
                    <div className="">
                        <img className="" src="http://localhost:3000/static/media/avatar_03.29ac6c4071291083beb4.webp" alt="not found" />
                    </div>   
                </button>    
                <h3 className="text-bold">Kevin Tran</h3>     
            </div>
            */} 
          <div className="flex flex-nowrap wrapper space-x-12 w-full">
            <div className="item">box-1</div>
            <div className="item">box-2</div>
            <div className="item">box-3</div>
            <div className="item">box-4</div>
            <div className="item">box-5</div>
            <div className="item">box-6</div>
            <div className="item">box-7</div>
            <div className="item">box-7</div>
            <div className="item">box-7</div>
            <div className="item">box-7</div>
            <div className="item">box-7</div>
            <div className="item">box-7</div>
            <div className="item">box-12</div>
            <div className="item">box-12</div>
          </div>

          </div>
        {/* End of Horizontal story flex container*/} 


        {/* Flex container for Groups You May Like & Circles*/}
        <div className="flex flex-col pt-12 space-y-16">
          <h3 className="text-left text-red-500 font-bold">
            Groups you may like...
          </h3>

            {/* Suggestions Container */}
          <div className="flex flex-row items-center space-x-16 mx-24 p-8 content-center">

            {/* Button for circle suggestion*/}
            <button className="button circleCard bg-gray-500 text-center">
              <img src="http://localhost:3000/static/media/Kinli.0ed26425c18317df7836.png" alt="" />
              <h5 className="font-bold mt-12">
                Name
              </h5>
              <p className="text-justify mx-auto">
                Diamond(s): 500
                Industry: Finance
              </p>
            </button>

            <div className="space-y-12">
                <button className="button circleCard bg-gray-500 text-center">
                <img src="http://localhost:3000/static/media/Kinli.0ed26425c18317df7836.png" alt="" />
                <h5 className="font-bold mt-12">
                    Name
                </h5>
                <p className="text-justify mx-auto">
                    Diamond(s): 500
                    Industry: Finance
                </p>
                </button>
                <h3 className="text-bold">Kevin Tran</h3>     
            </div>




            <div className="basis-1/5 bg-gray-500 w-[250px] h-[275px] rounded-lg hover:bg-gray-800"></div>
            <div className="basis-1/5 bg-blue-500 w-[250px] h-[275px] rounded-lg hover:bg-blue-800"></div>
            <div className="basis-1/5 bg-gray-500 w-[250px] h-[275px] rounded-lg hover:bg-gray-800"></div>
            <div className="basis-1/5 bg-gray-500 w-[250px] h-[275px] rounded-lg hover:bg-gray-800"></div>


          </div>
        </div>

        </section>
      </div>
    // <div className="ml-0 w-full pt-4 sm:ml-0 md:ml-0 lg:ml-3">
    //   <section className="relative h-24 justify-center">
    //   <div class="flex flex-row justify-center gap-2 grow h-2/4">
    //   {circleNav.map(({ pathTo, icon, img, navPath }) => (
    //     <NavLink 
    //       to={pathTo}
    //       className="sm:text-normal flex flex-row items-center gap-3 text-l"
    //     >
    //       {icon}
    //       <p className="sm:text-normal flex flex-row items-center gap-3 text-l">
    //       </p>
    //     </NavLink>
    //   ))}
    //   </div>
    //   </section>
    //   <section className="relative h-72 w-full">
    //     {circleData.coverPic && (
    //       <img
    //         src={circleData.coverPic}
    //         alt="cover"
    //         className="mx-auto h-fit max-h-72 w-full object-cover"
    //       />
    //     )}
    //     <div className="absolute right-1/2 -bottom-1/2 mx-auto flex h-fit w-80 translate-x-1/2 flex-col items-center gap-2 rounded-lg bg-slate-50 py-3 px-2 shadow sm:w-96 md:w-96 lg:w-96">
    //       <button
    //         className="absolute right-4 rounded-full border-none bg-slate-100 p-1.5 text-2xl text-gray-600 shadow-md hover:cursor-pointer hover:brightness-95 "
    //         onClick = {() => joinCircle (currentUser, circleData)  } 
              
    //       >
    //         <FiEdit3 />
    //       </button>
          
    //       <img
    //         src={user?.photoURL}
    //         alt="user-dp"
    //         className="md:h-18 lg:h-18 aspect-square h-14 w-fit rounded-full object-cover xl:h-24"
    //       />
    //       <p className="text-lg font-semibold underline">{circleData?.circleName}</p>
          
    //       <p className="text-center text-sm sm:text-base text-indent space-y-4 font-semi-bold">{circleData?.circleBio}</p>
    //    {/*   <p className="text-sm sm:text-base text-sky-400">{circleData?.circleChallenges}</p> */}
    //       <p className="text-sm sm:text-base font-semibold ">{circleData?.length} Members </p>
    //       <button class="btn btn-blue">{circleData?.joinCircle} </button>
    //       <p className="text-sm sm:text-base">{circleData?.diamondCount} 💎 </p>
          
    //     </div>
          
          
    //   </section>
    //    <ul className="mt-44 ">   
    //   <div className="relative mx-auto mt-2 flex  w-full min-w-[20rem] max-w-[90%] flex-col rounded-lg bg-gray-50 p-4 shadow-md sm:w-3/4 md:mx-auto md:w-3/4 lg:w-full">
    //   <p className="text-sm sm:text-base text-sky-400">CHALLENGE: {circleData?.circleChallenges} +10💎</p> 

            
    //   </div>
    //   <div className="relative mx-auto mt-2 flex  w-full min-w-[20rem] max-w-[90%] flex-col rounded-lg bg-gray-50 p-4 shadow-md sm:w-3/4 md:mx-auto md:w-3/4 lg:w-full">
    //   <p className="text-sm sm:text-base text-sky-400">Posts from {circleData?.circleName} Members</p> 

            
    //   </div>

      
    //         </ul>
      

    //         <ul className=" mb-16 md:mb-2">
    //     {filteredPosts?.map((post) => (
    //       <Post post={post} key={post?.postID} />
    //       ))}
    //   </ul>
    //   {/*  Experience Section */}

    //   {/* <ul className="mt-44 mb-16 md:mb-24">
    //     {filteredPosts?.map((post) => (
    //       <Post post={post} key={post?.postID} />
    //       ))}
    //   </ul> */}
    // </div>


  );
}

