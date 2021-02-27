import { motion } from 'framer-motion';
import { connect } from 'react-redux';

import { Seo } from '../helpers';
import { Button } from '../layout';
import AdminButtons from '../layout/Buttons/AdminButtons';
import Card from '../sections/learn/Card';
import Footer from '../layout/Footer/Footer';

const Learn = ({ auth }) => {
  const isAdmin = auth.user && auth.isAdmin;
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Learn);
