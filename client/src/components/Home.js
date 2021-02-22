import React from 'react';
import TopSection from '../sections/home/TopSection';
import BottomSection from '../sections/home/BottomSection';
import Preloader from '../layout/preloader';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Home = () => {
  var homeContent = 'adsf';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Key words in the description should be coordinated with the stuff written in home page */}
      <Helmet>
        <title>Coders Gala</title>
        <meta
          name="description"
          content="Coders Gala is a free platform to learn webdevelopment for freelancing"
        />
        <meta name="robots" content="index follow" />
      </Helmet>
      <div id="myDiv">
        {homeContent ? (
          <div className="home-container">
            <TopSection />
            <BottomSection />
          </div>
        ) : (
          <Preloader />
        )}
      </div>
    </motion.div>
  );
};

export default Home;
