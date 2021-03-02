import { motion } from "framer-motion";
import { Seo } from "../helpers";
import Hero from "../sections/home/Hero";
import HeroCards from "../sections/home/HeroCards";
import Preloader from "../layout/Preloader";

const Home = () => {
  var homeContent = "adsf";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Seo title="Home" meta={[{ name: "robots", content: "index follow" }]} />
      <div id="myDiv">
        {homeContent ? (
          <div className="home-container">
            <Hero />
            <HeroCards />
          </div>
        ) : (
          <Preloader />
        )}
      </div>
    </motion.div>
  );
};

export default Home;
