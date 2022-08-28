import React, { useState } from 'react';
import Modal from '../utils/Modal';
import Mailchimp from "react-mailchimp-form"

import HeroImage from '../images/hero-image.png';
import landing from "../images/landing.png";
import saly from "../images/Saly-19.png"
import { SocialIcon } from 'react-social-icons';
import SocialMediaButtons from 'react-social-media-buttons';
import { getAnalytics, logEvent } from "firebase/analytics";



function HeroHome({setShowLogin}) {

  const [signUp, setSignUp] = useState(false);
  const url = "https://gmail.us5.list-manage.com/subscribe/post?u=f0e76fea54c485e0d8c9b1bce&amp;id=bf9de081e9&amp;f_id=007adee6f0"
  
  function recordLaunchSignup() {
    const analytics = getAnalytics();
    logEvent(analytics, 'launch_signup_button');
    console.log("clicked launch signup");
    setSignUp(true);
  }

  return (
    <section className="relative">
      <div className="flex h-1/2 justify-center items-center mr-auto ml-auto flex-wrap container">
    <div className="flex w-full h-full justify-center items-center pr-4 pl-4 md:w-1/2 md:mb-0">
    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none" aria-hidden="true">
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="650" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-10 pb-12 md:pt-40 md:pb-20">
          {/* Cool Colors */}
        <div class="absolute opacity-70 -inset-px rounded-xl blur-xl group-hover:opacity-100
                    group-hover:-inset-1 duration-200 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-400 z-0"></div>
          {/* Section header */}
          <div className=" relative text-center z-40">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tighter tracking-tighter mb-4 z-40" data-aos="zoom-y-out">Leaders lead Kinli<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"> Circles</span></h1>
            <div className="w-full mx-auto z-40">
              <p className="p-8 text-3xl text-center text-gray-600 font-bold z-40" data-aos="zoom-y-out" data-aos-delay="150">Compete to be the top circle in the world! Show everyone that you are a leader.
              </p>
              <p className="p-8 text-xl text-center text-gray-600 font-bold z-0" data-aos="zoom-y-out" data-aos-delay="150">You caught us a little early! Sign up for our private beta! Follow us on Instagram and LinkedIn for updates and funny job content!
              </p>
              <div className="mx-16 flex flex-col sm:flex-row sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
               
              <div classname= "mt-10 flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0">
              
                {!signUp && (<a className="inline-flex font-bold text-base items-center justify-center bg-gray-900 text-white
                    border-transparent mx-1.5 px-8 py-3 false relative z-10 leading-7 transition-all border duration-200
                    rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-600
                    focus:ring-offset-[#FFE942] cursor-pointer mt-4"
                    onClick= { () => recordLaunchSignup()}>Sign Up</a>)}
             
              
              </div>
              {signUp && (<Mailchimp 
                action={url}
                fields={[
                  {
                    name: 'EMAIL',
                    placeholder: 'Email',
                    type: 'email',
                    required: true
                  }
                ]}
                messages = {
                  {
                    sending: "Sending...",
                    success: "Thank you for subscribing!",
                    error: "An unexpected internal error has occurred.",
                    empty: "Please enter an e-mail.",
                    duplicate: "Too many subscribe attempts for this email address",
                    button: "Sign Up!"
                  }
                }
                className = "mt-0 5mx-auto space-y-4 text-center font-bold font-xl"
                />)}
              <ul className='w-full justify-center flex sm:w-1/2 mt-4 flex-row ml-0 sm:ml-10 space-x-10'>
              {/* <SocialIcon url="https://www.facebook.com/profile.php?id=100084942515997" />
              <SocialIcon url="https://www.instagram.com/kinlicircles/" /> */}
              <SocialMediaButtons
                links={['https://www.facebook.com/profile.php?id=100084942515997','https://www.instagram.com/kinlicircles/','https://www.linkedin.com/company/joobie/']}
                buttonStyle={{margin: '0px 0.25em', backgroundColor: '#cce7ff', borderRadius: '30%'}}
                iconStyle={{color: '#134d8b'}}
                openNewTab={true}
              />
              </ul>


              </div>
            </div>
          </div>

          {/* Hero image */}
         
        </div>

      </div>
    </div>
    <div className="flex w-full h-full justify-center items-center pr-4 pl-4 md:w-1/2 md:mb-0">
      <div>
              <div className="relative flex justify-center mb-8 mt-0" data-aos="zoom-y-out" data-aos-delay="450">
                <div className="flex flex-col justify-center">
                  <img className="mx-auto" src={saly} width="768" height="432" alt="Hero" />
                </div>
              </div>
            </div>

      </div>
  </div>
      {/* Illustration behind hero content */}
      
    </section>
  );
}

export default HeroHome;