import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit3 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { joinCircle, getCircle, completeChallenge, getUser } from "../../firebase/firebase-calls";
//import EditProfileModal from "./EditProfileModal";
import { Post, OppTextEditor, QuestionTextEditor } from "components/components";


export default function CirclesTest() {
  const { circleID } = useParams();
  const { user } = useSelector((state) => state.user);
  const { allPosts } = useSelector((state) => state.allPosts);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const {allCircles} = useSelector((state) => state.allCircles)
  const otherCircle = allCircles?.find((circle) => circle?.circleID == circleID)
  const currentUser = auth?.currentUser;
  const [circleData, setCircleData] = useState([]);
  
  const [showOpp, setOpp] = useState(false);
  const [ShowHome, setHome] = useState(true);
  const [showQA, setQA] = useState(false);

  useEffect(
    () => {
       if (currentUser.length==0) getUser(currentUser, setUserData);
    },
    // eslint-disable-next-line
    [userData]
  );

  
  useEffect(
    () => {
      if (circleData.length ==0){
        getCircle(otherCircle?.circleID, setCircleData);
        console.log("getting Circle");
        console.log(circleData);
        console.log("done");
      }
    },
    // eslint-disable-next-line
    [circleData]
  );


// --Render Components --
//Opportunities
const renderOpp=() =>  {
  setOpp(true);
  setQA(false);
  setHome(false);
  console.log("Opportunities pressed")

}

//Question and Answer
  const renderQA=() =>  {
    setOpp(false);
    setQA(true);
    setHome(false);
    console.log("QA pressed");

}
//Home
const renderHome=() =>  {
  setOpp(false);
  setQA(false);
  setHome(true);
  console.log("Home pressed");

}




  return (
    <div className="ml-0 w-full h-full pt-4 sm:ml-0 md:ml-0 lg:ml-3">
      <div className="relative justify-center items-center mx-auto mt-2 flex  w-full min-w-[20rem] max-w-[90%] flex-row rounded-lg bg-gray-50 p-4 shadow-md sm:w-3/4 md:mx-auto md:w-3/4 lg:w-full">
        <button
            className="flex mx-5 rounded-full border-none bg-slate-100 p-1.5 text-xl text-gray-600 shadow-md hover:cursor-pointer hover:brightness-95 "
            onClick = {renderHome} >
            Home
          </button>
      { /* Opportunities Button */}
      <button
            className="flex mx-5 rounded-full border-none bg-slate-100 p-1.5 text-xl text-gray-600 shadow-md hover:cursor-pointer hover:brightness-95 "
            onClick = {renderOpp }>
            Opportunities
          </button>

          { /* Q&A Button */}
          <button
            className="flex mx-5 rounded-full border-none bg-slate-100 p-1.5 text-xl text-gray-600 shadow-md hover:cursor-pointer hover:brightness-95 "
            onClick = {renderQA }>
          Q and A
          </button>

        
          

      </div>
      {showOpp && <OppTextEditor CircleID={circleData?.circleID}/> }
      {showQA && <QuestionTextEditor CircleID={circleData?.circleID}/>}
      <section className="relative h-full w-full mt-2">
     
        { /* Card Container */}
        <div className="relative mx-auto mt-2 flex flex-col items-center w-full min-w-[20rem] max-w-[90%] rounded-lg p-4 shadow-md sm:w-3/4 md:mx-auto md:w-3/4 lg:w-full">
        {circleData.coverPic && (
          <img
            src={circleData.coverPic}
            alt="cover"
            className="mx-auto h-fit max-h-72 w-full object-cover"
          />
        )}
          <img
            src={user?.photoURL}
            alt="user-dp"
            className="md:h-18 lg:h-18 aspect-square h-14 w-fit rounded-full object-cover xl:h-24"
          />
          
          <p className="text-center font-semibold text-xl underline p-2">{circleData?.circleName}</p>
          <p className="text-center text-sm sm:text-base space-y-4 p-2 font-semi-bold">{circleData?.circleBio}</p>
       {/*   <p className="text-sm sm:text-base text-sky-400">{circleData?.circleChallenges}</p> */}
          <p className="text-sm sm:text-base font-semibold p-2">{circleData?.memberCount.length} Members </p>
          
          <p className="text-sm sm:text-base">{}💎</p>

          <button
            className="rounded-full border-none bg-slate-100 mt-2 md:mt-1 p-2 text-xl text-gray-600 shadow-md hover:cursor-pointer hover:brightness-95 "
            onClick = {() => joinCircle (currentUser, circleData)  } //Follow Button for Circles
          >
          Join            
          </button>


          {/* <p className="text-sm sm:text-base">{circleData?.challenges.length * 100} 💎 </p> */}
        </div>

        <ul className="">

        {/* Challenges Container */}    
        <div className="relative mx-auto mt-2 flex flex-col justify-start w-full min-w-[20rem] max-w-[90%] rounded-lg p-4 shadow-md sm:w-3/4 md:mx-auto md:w-3/4 lg:w-full">
          
        <p className="text-sm sm:text-base text-sky-400">CHALLENGE: {circleData?.circleChallenges} +100 💎</p> 
        <button className="relative justify-center items-center mx-auto mt-2 flex w-full min-w-[20rem] max-w-[90%] flex-row rounded-lg bg-green-300 hover:bg-green-200 shadow-md sm:w-3/4 md:mx-auto md:w-3/4 lg:w-1/6"
              onClick= {() => completeChallenge(currentUser, circleData) } //Complete Button for Circles    
            >
            Complete Challenge            
            </button>      
        </div>
        <div className="relative mx-auto mt-2 flex  w-full min-w-[20rem] max-w-[90%] flex-col rounded-lg bg-gray-50 p-4 shadow-md sm:w-3/4 md:mx-auto md:w-3/4 lg:w-full">
        <p className="text-sm sm:text-base text-sky-400">Posts from {circleData?.circleName} Members</p> 


        <p className="text-sm sm:text-base text-sky-400"> Questions and Answers {circleData?.circleName} Members</p> 
            
        </div>
        </ul>
      </section>


          {/* This is Kyle's way of iterating through opportunities 
            <ul className=" mb-16 md:mb-2">
              {filteredPosts?.map((post) => (
              <Post post={post} key={post?.postID} />
              ))} *
              {circleData?.Opportunities?.map((opp) => (<Post post={opp} key={opp?.circleID}/>))}
            </ul>
          /*}
      {/*  Experience Section */}
      
        <ul className=" mb-16 md:mb-2">
                {showQA && circleData?.Questions?.map((ques) => (<Post post={ques} key={ques?.circleID}/>))}
                {showOpp && circleData?.Opportunities?.map((ques) => (<Post post={ques} key={ques?.circleID}/>))}

        </ul>

      
      

        
      
      {/* <ul className="mt-44 mb-16 md:mb-24">
        {filteredPosts?.map((post) => (
          <Post post={post} key={post?.postID} />
          ))}
      </ul> */}
    </div>
  );
}

