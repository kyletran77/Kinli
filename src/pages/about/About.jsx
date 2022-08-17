import { TextEditor, Post, RightSideBar } from "components/components";
import { Empty } from "pages/pages";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function About() {

  return (
    <div className="w-full bg-white-100">
        {/* Container for the entire page */ }
        <div className="h-full w-full">
            <h5 className="font-semibold">Welcome to Kinli</h5>
            <h4 className="">We are glad to have you here. Here's how Kinli works!</h4>
            <h4 className="underline bg-gradient-to-t	">About Kinli</h4>

            <h5 className="">

Kinli is used to help individuals by bringing them into circles, where they can learn and grow with their career with team members. 

Be on the lookout for excellent job opportunities and knowledge!

<h4 className="underline">Circles</h4>


Circles are groups formed around a specific interest; whether that be Engineering Society, Business, Nursing, etc. They are meant to form around making each other welcome and prosper from one another. 

Circles are also meant to compete with one another with diamonds. These diamonds help Circles stay competitive among other Circles. Diamonds can be obtained by completing challenges and keeping each other member accountable.

<h4 className="underline">Posts</h4>


Share great professional experiences and stories through your posts. 
Engage with Kinli members and be active to get new experiences!


<h4 className="underline">Profiles and Resumes</h4>

Your Profile is your story. Your Professional Journey. 
Kinli wants you to document every experience on the platform to cultivate your own success. 

Your resume can be filled out from your profile, and be used to create a top-notch resume to send to employers such as Google, Apple, Deloitte, etc. Your dream job is waiting!
</h5>

        </div>







    </div>
  );
}
