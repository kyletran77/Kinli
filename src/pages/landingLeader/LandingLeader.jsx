import React from 'react';

import Header from './partials/Header';
import HeroHome from './partials/HeroHome';
import FeaturesHome from './partials/Features';
import FeaturesBlocks from './partials/FeaturesBlocks';
import Testimonials from './partials/Testimonials';
import Newsletter from './partials/Newsletter';
import Footer from './partials/Footer';
import CircleFeatures from "./partials/CircleFeatures";


function LandingLeader() {
  return (
    <div className="flex">
      <div className="flex flex-col overflow-hidden w-full">
        <main className="flex-grow">

          <HeroHome />
          <CircleFeatures/>
          <Footer/>

        </main>

      </div>
    </div>

  );
}

export default LandingLeader;