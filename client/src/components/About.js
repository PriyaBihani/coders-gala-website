import React from 'react';
import { motion } from 'framer-motion';

import { Seo } from '../helpers';

import Questions from '../sections/about/Questions';
import AboutUs from '../sections/about/AboutUs';
import { Footer } from '../layout';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Seo title="About" />
      <div className="about-page scroller">
        <div className="ovr-wave top-slide">
          <h1 style={{ textAlign: 'center' }}>Hello there,</h1>
          <div className="subheading-about">
            We created <span className="logo text-dark">Coders Gala</span> to
            provide You Quality resources to learn From
          </div>
          <div>
            <img
              alt="scroll icon"
              src="https://gifimage.net/wp-content/uploads/2018/05/scroll-gif-10.gif"
              className="scroll-icon"
            />
          </div>
        </div>
        <Questions />
        <AboutUs />
        <Footer />
      </div>
    </motion.div>
  );
};

export default About;
