import React, { useState } from 'react';
import Modal from '../utils/Modal';
import Mailchimp from "react-mailchimp-form"

import HeroImage from '../images/hero-image.png';
import landing from "../images/landing.png";
import { SocialIcon } from 'react-social-icons';
import SocialMediaButtons from 'react-social-media-buttons';



function HeroHome({setShowLogin}) {

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const url = "https://gmail.us5.list-manage.com/subscribe/post?u=f0e76fea54c485e0d8c9b1bce&amp;id=bf9de081e9&amp;f_id=007adee6f0"


  return (
    <section className="relative">

      {/* Illustration behind hero content */}
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
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-10 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Never be<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"> alone</span></h1>
            <div className="w-full mx-auto">
              <p className="p-8 text-xl text-center text-gray-600 font-bold" data-aos="zoom-y-out" data-aos-delay="150">Build your professional profile 
              like LinkedIn, but network through groups better than LinkedIn​.</p>
              <div className="mx-16 flex flex-col sm:flex-row sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
               
                {/* <button className="flex text-white bg-blue-600 hover:bg-blue-700 mb-4 sm:w-auto sm:mb-0" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); }} aria-controls="modal">
              
                <span className="ml-3">Try us out!</span>
              </button> */}
              {/* <button type="button" class="text-white font-bold bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={(prev)=>setShowLogin(prev)}
              >Login</button> */}
              <div classname= "mt-10 flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0">
              <Mailchimp 
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
                    button: "Join Us!"
                  }
                }
                className = "mt-5 mx-auto space-y-4 text-center font-bold"
                />
              </div>
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
          <div>
            <div className="relative flex justify-center mb-8 mt-0" data-aos="zoom-y-out" data-aos-delay="450">
              <div className="flex flex-col justify-center">
                <img className="mx-auto" src={landing} width="768" height="432" alt="Hero" />
                {/* <Rec/>, document. */}
              {/* (<Rec />, document.querySelector("#root")); */}

                {/* <svg className="absolute inset-0 max-w-full mx-auto md:max-w-none h-auto" width="768" height="432" viewBox="0 0 768 432" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <defs>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="hero-ill-a">
                      <stop stopColor="#FFF" offset="0%" />
                      <stop stopColor="#EAEAEA" offset="77.402%" />
                      <stop stopColor="#DFDFDF" offset="100%" />
                    </linearGradient>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="99.24%" id="hero-ill-b">
                      <stop stopColor="#FFF" offset="0%" />
                      <stop stopColor="#EAEAEA" offset="48.57%" />
                      <stop stopColor="#DFDFDF" stopOpacity="0" offset="100%" />
                    </linearGradient>
                    <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="hero-ill-e">
                      <stop stopColor="#4FD1C5" offset="0%" />
                      <stop stopColor="#81E6D9" offset="25.871%" />
                      <stop stopColor="#338CF5" offset="100%" />
                    </radialGradient>
                    <circle id="hero-ill-d" cx="384" cy="216" r="64" />
                  </defs>
                  <g fill="none" fillRule="evenodd">
                    <circle fillOpacity=".04" fill="url(#hero-ill-a)" cx="384" cy="216" r="128" />
                    <circle fillOpacity=".16" fill="url(#hero-ill-b)" cx="384" cy="216" r="96" />
                    <g fillRule="nonzero">
                      <use fill="#000" xlinkHref="#hero-ill-d" />
                      <use fill="url(#hero-ill-e)" xlinkHref="#hero-ill-d" />
                    </g>
                  </g>
                </svg> */}
              </div>
              
            </div>

            {/* Modal */}
            

          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroHome;