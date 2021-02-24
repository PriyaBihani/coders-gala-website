import React from 'react';
import { motion } from 'framer-motion';

import { Seo } from '../helpers';

import TopSlide from '../sections/about/TopSlide';
import AboutDin from '../sections/about/AboutDin';
import AboutUs from '../sections/about/AboutUs';
import Footer from '../layout/Footer/Footer';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Seo title="About" />
      <div className="about-page">
        <div className="scroller">
          <section className="about-header">
            <TopSlide />
          </section>
          <section className="main">
            <AboutDin />
          </section>
          <section id="aboutus">
            <AboutUs />
          </section>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default About;
