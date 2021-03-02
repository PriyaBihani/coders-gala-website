import { motion } from 'framer-motion';
import { connect } from 'react-redux';

import { Seo } from '../helpers';
import AdminButtons from '../layout/Buttons/AdminButtons';
import Card from '../sections/learn/Card';
import { Footer } from '../layout/';

const Learn = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <Seo title="Learn" meta={[{ name: 'robots', content: 'index follow' }]} />
      <div className="container learn-container">
        <AdminButtons type="Add" url="/addcard" data={{ Name: 'Add Card' }} />
        <div className="flex">
          <Card />
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Learn;
