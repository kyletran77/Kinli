import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import {getCircle, getUser } from "../../firebase/firebase-calls";
import { Link } from "react-router-dom";
//import EditProfileModal from "./EditProfileModal";

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
        <section className="w-full h-full">

        {/* Horizontal story flex container*/} 
          <div className="flex-row justify-center mx-8 border-2 border-black h=1/4">
            <div className="flex flex-nowrap wrapper space-x-4 w-full">

            {/* iterate through circles in id list */}
              {userData?.joinedCircle?.map((circles) => (
                <Link className=""
                  to={`/circle/${circles}`}>
                    <div className="item items-center mx-auto">
                      <img src={circles?.img} 
                        alt="" 
                        className = "object-contain"/>
                    </div>
                    <h5 className="pt-1 font-bold text-center text-sm md:text-base w-48 mb-2">{allCircles.find(circle => circle.circleID === circles).circleName}</h5>
                </Link>
              ))}
            </div>
          </div>
        {/* End of Horizontal story flex container*/} 


        {/* Flex container for Groups You May Like & Circles*/}
        <div className="space-y-0 mx-8 rounded-lg h-3/5">
          <div className="border-b-2 border-gray-200 mb-8 mt-8">
            <h3 className="text-left text-black font-bold mx-auto">
              Groups you may like...
            </h3>
          </div>


            {/* Suggestions Container */}
          <div className="flex-col md:flex-row md:flex w-full space-x-24 items-center rounded-lg" >

            {/* Button for circle suggestion*/}
            {allCircles?.map((circles) => (
              <Link className="button circleCard bg-red-200 content-justify text-justify rounded-lg"
              to={`/circle/${circles?.circleID}`}
              >
                {/* Each individual circle container */}
                <div className="sm:text-sm max-h-96 bg-white rounded-lg">
                  <div className="rounded-lg w-full h-full overflow-hidden">
                    <img src={circles?.img} 
                    alt="" 
                    className = "h-64 w-full object-cover"/>
                  </div>

                  <h5 className="mt-4 font-bold text-left">
                    {circles.circleName}
                  </h5>
                  <p className="text-left mx-auto">
                    Diamond(s): {circles.diamondCount}
                  </p>
                  <p className="text-text-left mx-auto">
                  Industry: {circles.industry}
                  </p>
                </div>
            </Link>
            ))}
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

