import React, { useState, useRef, useEffect } from 'react';
import Challenges from "../images/Challenges.png"
import Question from '../images/Question.png';
import Opportunities from '../images/Opportunities.png';

function CircleFeatures() {

  return (
    <div className="bg-gray-100">
  <div className="relative sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 mx-auto
      pt-16 pr-4 pb-16 pl-4">
               <h1 className="text-6xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 z-40" data-aos="zoom-y-out">It feels great to have true<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"> friends</span></h1>

    <div className="relative gap-5 sm:grid-cols-2 lg:grid-cols-3 grid">
      <div className="bg-white text-left transition-shadow duration-200 rounded group hover:shadow-2xl flex flex-col
          justify-between items-center overflow-hidden shadow-xl ml-0">
                    <img src={Question} className="h-auto w-full lg:w-auto lg:h-full object-contain object-top"/>

        <div className="mt-5 mr-5 mb-5 ml-5">
          <p className="font-bold text-3xl mb-2 ">Be supported and Guided by Circle
              Leaders</p>
        </div>
      </div>
      <div className="bg-white text-left transition-shadow duration-200 rounded group hover:shadow-2xl flex flex-col
          justify-between items-center overflow-hidden shadow-xl ml-0">
        <img src={Opportunities} className="h-auto w-full lg:w-auto lg:h-full object-contain object-top"/>
        <div className="mt-5 mr-5 mb-5 ml-5">
          <p className="font-bold text-3xl mb-2 ">
            Earn referrals and loyalty from anyone in your Circle
          </p>
        </div>
      </div>
      <div className="bg-white text-left transition-shadow duration-200 rounded group hover:shadow-2xl flex flex-col
          justify-between items-center overflow-hidden shadow-xl ml-0">
        <img src={Challenges} className="h-auto w-full lg:w-auto lg:h-full object-contain object-top"/>

        <div className="mt-5 mr-5 mb-5 ml-5">
       
          <p className="font-bold text-3xl mb-2 ">Engagement earns you rewards and points for your Circle</p>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default CircleFeatures;
