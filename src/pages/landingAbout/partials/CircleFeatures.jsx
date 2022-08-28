import React, { useState, useRef, useEffect } from 'react';
import connect from "../images/Saly-31.png";
import direction from '../images/Saly-34.png';
import change from "../images/Saly-11.png";

function CircleFeatures() {

  return (
    <div className="bg-gray-100">
  <div className="space-y-8 relative sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 mx-auto
      pt-16 pr-4 pb-16 pl-4">
               <h1 className="text-6xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 z-40" data-aos="zoom-y-out">Our<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"> vision</span></h1>

    <div className="relative gap-5 sm:grid-cols-2 lg:grid-cols-3 grid">
      <div className="bg-white text-left transition-shadow duration-200 rounded group hover:shadow-2xl flex flex-col
          justify-between items-center overflow-hidden shadow-xl ml-0">
                    <img src={change} className="h-auto w-full lg:w-auto lg:h-full object-contain object-top"/>

        <div className="mt-5 mr-5 mb-5 ml-5">
          <p className="text-center font-bold text-2xl mb-2 ">A change in the way people look at careers</p>
        </div>
      </div>
      <div className="bg-white text-left transition-shadow duration-200 rounded group hover:shadow-2xl flex flex-col
          justify-between items-center overflow-hidden shadow-xl ml-0">
        <img src={direction} className="h-auto w-full lg:w-auto lg:h-full object-contain object-top"/>
        <div className="mt-5 mr-5 mb-5 ml-5">
          <p className="text-center font-bold text-2xl mb-2">
            A sense of professional direction for future generations
          </p>
        </div>
      </div>
      <div className="bg-white text-left transition-shadow duration-200 rounded group hover:shadow-2xl flex flex-col
          justify-between items-center overflow-hidden shadow-xl ml-0">
        <img src={connect} className="h-auto w-full lg:w-auto lg:h-full object-contain object-top"/>

        <div className="mt-5 mr-5 mb-5 ml-5">
       
          <p className="text-center font-bold text-2xl mb-2 ">Make connecting with others easier</p>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default CircleFeatures;
