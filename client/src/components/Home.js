import { motion } from 'framer-motion';
import { Seo } from '../helpers';
import TopSection from '../sections/home/TopSection';
import BottomSection from '../sections/home/BottomSection';
import Preloader from '../layout/Preloader';

const Home = () => {
  var homeContent = 'adsf';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Seo meta={[{ name: 'robots', content: 'index follow' }]} />
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
