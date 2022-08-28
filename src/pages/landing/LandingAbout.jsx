import React from 'react';

import Header from './partials/Header';
import HeroHome from './partials/HeroHome';
import FeaturesHome from './partials/Features';
import FeaturesBlocks from './partials/FeaturesBlocks';
import Testimonials from './partials/Testimonials';
import Newsletter from './partials/Newsletter';
import Footer from './partials/Footer';
import CircleFeatures from './partials/CircleFeatures';


export default function LandingAbout() {
  return (
    <div className="mt-0 mx-12 flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      {/* <Header /> */}

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <div className="w-full h-full bg-gradient-to-r from-blue-400 via-pink-500 to-yellow-400 absolute opacity-70"></div>
        <main className="flex-grow">
            <HeroHome />
            <CircleFeatures/>
            <Footer/>
            {/* <FeaturesHome setShowLogin={loginClick}/> */}
            {/* <Testimonials/> */}
        </main>

      </main>

      {/*  Site footer */}
      {/* <Footer /> */}

    </div>
  );
}
