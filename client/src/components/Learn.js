import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { Seo } from '../helpers'
import Card from "../sections/learn/Card";
import Footer from "../layout/Footer/Footer";



const Learn = ({ auth }) => {
  const isAdmin = auth.user && auth.isAdmin;
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <Seo meta={ [{name: 'robots', content="index follow" }] } />
      <div>
        <div className="container learn-container">
          <div className="flex">
            <Card />
          </div>
          <div className="clear-flex"></div>
          <div className="mb-3 ml-3 mr-3">
            {isAdmin ? (
              <div className="text-center">
                <NavLink to="/addcard">
                  <Button>Add Card</Button>
                </NavLink>
              </div>
            ) : null}
          </div>
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
