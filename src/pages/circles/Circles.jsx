import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit3 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { joinCircle, getCircle, completeChallenge, getUser, updateEngagement} from "../../firebase/firebase-calls";
//import EditProfileModal from "./EditProfileModal";
import { Post, OppTextEditor, QuestionTextEditor, ProgressBar } from "components/components";


export default function Circles() {
  const { circleID } = useParams();
  const { user } = useSelector((state) => state.user);
  const { allPosts } = useSelector((state) => state.allPosts);
  const { allUsers } = useSelector((state) => state.allUsers);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {allCircles} = useSelector((state) => state.allCircles)
  const otherCircle = allCircles?.find((circle) => circle?.circleID == circleID)
  const currentUser = auth?.currentUser;
  const [circleData, setCircleData] = useState([]);
  const [engage, setEngagement] = useState(0);
  
  const [showOpp, setOpp] = useState(false);
  const [ShowHome, setHome] = useState(true);
  const [showQA, setQA] = useState(false);

  useEffect(
    () => {
       if (currentUser?.length==0) getUser(currentUser, setUserData);
    },
    [userData]
  );

  
  useEffect(
    () => {
      if (circleData.length ==0){
        getCircle(otherCircle?.circleID, setCircleData);
        console.log("getting Circle");
        setIsLoading(false);
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
  getEngagement();
}

//Question and Answer
  const renderQA=() =>  {
    setOpp(false);
    setQA(true);
    setHome(false);
    console.log("QA pressed");
    getEngagement();

}
//Home
const renderHome=() =>  {
  setOpp(false);
  setQA(false);
  setHome(true);
  console.log("Home pressed");
  getEngagement();

}
const getEngagement=() => {
  if (!isNaN(circleData?.challenges?.length/circleData?.memberCount?.length)) setEngagement(circleData?.challenges?.length/circleData?.memberCount?.length)
        updateEngagement(circleData?.circleID, engage)
        console.log(engage);
}




  return (
    
    <div className="ml-0 w-full pt-4 sm:ml-0 md:ml-0 lg:ml-3">
      <div className="relative justify-center items-center mx-auto mt-2 flex  w-full min-w-[20rem] max-w-[90%] flex-row rounded-lg bg-gray-50 p-4 shadow-md sm:w-3/4 md:mx-auto md:w-3/4 lg:w-full">
         <button
             className="flex mx-5 rounded-full border-none bg-slate-100 p-1.5 text-2xl text-gray-600 shadow-md hover:cursor-pointer hover:brightness-95 "
             onClick = {renderHome} >
             Home
           </button>
       { /* Opportunities Button */}
       <button
             className="flex mx-5 rounded-full border-none bg-slate-100 p-1.5 text-2xl text-gray-600 shadow-md hover:cursor-pointer hover:brightness-95 "
             onClick = {renderOpp }>
             Opportunities
           </button>
 
           { /* Q&A Button */}
           <button
             className="flex mx-5 rounded-full border-none bg-slate-100 p-1.5 text-2xl text-gray-600 shadow-md hover:cursor-pointer hover:brightness-95 "
             onClick = {renderQA }>
           Q and A
           </button>
 
       </div>
       {showOpp && <OppTextEditor CircleID={circleData?.circleID}/> }
       {showQA && <QuestionTextEditor CircleID={circleData?.circleID}/>}
      {isLoading && <p>Loading</p>}

      {!isLoading && (
        
        <div>
       <section className="relative h-80 w-full mt-16">
      
         {circleData.coverPic && (
           <img
             src={circleData.coverPic}
             alt="cover"
             className="mx-auto h-fit max-h-72 w-full object-cover"
           />
         )}
 
         { /* Following Button */}
         <div className="absolute right-1/2 -bottom-1/2 mx-auto flex h-fit w-80 translate-x-1/2 flex-col items-center gap-2 rounded-lg bg-slate-50 py-3 px-2 shadow sm:w-96 md:w-96 lg:w-96">
           <button
             className="absolute right-4 rounded-full border-none bg-slate-100 p-1.5 text-2xl text-gray-600 shadow-md hover:cursor-pointer hover:brightness-95 "
             onClick = {() => joinCircle (currentUser, circleData)  } //Follow Button for Circles
               
           >
           Join            
           </button>
 
          
 
           <img
             src={user?.photoURL}
             alt="user-dp"
             className="md:h-18 lg:h-18 aspect-square h-14 w-fit rounded-full object-cover xl:h-24"
           />
           
           <p className="text-lg font-semibold underline">{circleData?.circleName}</p>
           <p className="text-center text-sm sm:text-base text-indent space-y-4 font-semi-bold">{circleData?.circleBio}</p>
        {/*   <p className="text-sm sm:text-base text-sky-400">{circleData?.circleChallenges}</p> */}
           <p className="text-sm sm:text-base font-semibold ">{circleData?.memberCount?.length} Members </p>
           <p className="text-sm sm:text-base font-semibold ">{circleData?.memberCount?.length} Members </p>

          <p className="text-sm sm:text-base">{circleData?.diamondCount}  </p>


          <h1 className ="mt-4">List of Users{'\n'}</h1>
          <ul className="mx-auto flex flex-col">
          {circleData?.memberCount?.map((member) => (
            <div className="bg-slate-200 rounded-lg pt-1 font-bold text-center text-l flex flex-row">

            {allUsers.find(user => user.userID === member).displayName}
            &nbsp;
            {allUsers.find(user => user.userID === member)?.status}
            </div>
            ))}
          </ul>
          
 
           
           
           <p className="text-sm sm:text-base">{circleData?.diamondCount} 💎 </p>
           {/* <p className="text-sm sm:text-base">{circleData?.challenges.length * 100} 💎 </p> */}
           <ProgressBar done = {`${100*(circleData?.challenges?.length/circleData?.memberCount?.length)}`}/>

 
           
         </div>
       </section>
        <ul className="mt-44 ">
 
       {/* Challenges Container */}    
       <div className="relative mx-auto mt-2 flex  w-full min-w-[20rem] max-w-[90%] flex-col rounded-lg bg-gray-50 p-4 shadow-md sm:w-3/4 md:mx-auto md:w-3/4 lg:w-full">
         
       <p className="text-sm sm:text-base text-sky-400">CHALLENGE: {circleData?.circleChallenges} +100 💎</p> 
       <button className="absolute right-64 bg-green-200 rounded-full mbot-10 border-none text-xl text-gray-600 shadow-md hover:cursor-pointer hover:bg-green-100 "
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
 
       
         <ul className=" mb-16 md:mb-2">
                 {showQA && circleData?.Questions?.map((ques) => (<Post post={ques} key={ques?.circleID}/>))}
                 {showOpp && circleData?.Opportunities?.map((ques) => (<Post post={ques} key={ques?.circleID}/>))}
 
         </ul>
         </div>
      )
      }
    </div>
  );
}