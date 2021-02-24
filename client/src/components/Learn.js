import { motion } from 'framer-motion';
import { connect } from 'react-redux';

import { Seo } from '../helpers';
import { Button } from '../assets/icons';
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
      <div>
        <div className="container learn-container">
          <div className="flex">
            <Card />
          </div>
          <div className="clear-flex"></div>
          {isAdmin ? (
            <div className="text-center">
              <Button text="Add Card" url="/addcard" dark={true} />
            </div>
          ) : null}
        </div>

        <Footer />
      </div>
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Learn);
