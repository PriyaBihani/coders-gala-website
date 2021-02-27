import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from '../../layout';
import { Delete, Update } from '../../assets/icons';
import { connect } from 'react-redux';
import { serviceGet, servicePost } from '../../helpers/api';
import {
  getSpecialities,
  deleteSpeciality,
  clearSpeciality,
} from '../../actions/speciality';

const Card = ({
  getSpecialities,
  specialities,
  deleteSpeciality,
  isAdmin,
  clearSpeciality,
}) => {
  console.log(isAdmin);

  const [learningCards, setLearningCards] = useState([{}]);

  useEffect(async () => {
    console.log(specialities);
    if (specialities.length == 0) {
      getSpecialities();
    }
  }, []);

  const handleDelete = (item) => {
    const confirm = window.prompt(
      `You sure want to delete "${item.Name}" ? Y or N (Deleting a speciality will lead to deletion of all topics and articles inside it) `
    );
    if (confirm === 'Y') {
      deleteSpeciality(item._id);
    }
  };

  console.log('data');

  return (
    <div className="learn-container">
      <div className="container pt-4">
        <div className="row">
          {specialities &&
            specialities.map((item) => {
              return (
                <div key={item._id} className="col-lg-6">
                  <div className="card">
                    <div className="imgBx">
                      <img
                        className="image"
                        src={item.imageUrl}
                        alt={item.alt}
                      />
                    </div>
                    <div
                      style={{
                        height: window.innerWidth <= 600 ? '150px' : 'auto',
                      }}
                      className="contentBx"
                    >
                      <h2> {item.Name}</h2>
                      {isAdmin ? (
                        <>
                          <Link to={'/updatespeciality/' + item.Name}>
                            <Update size="20" color="#A40E4C" />
                          </Link>
                          <Delete
                            onClick={() => {
                              handleDelete(item);
                            }}
                            size="20"
                            color="#A40E4C"
                          />
                        </>
                      ) : null}
                      <Button url={'/learn/' + item.Name}>Start Now</Button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  specialities: state.speciality.specialities,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, {
  getSpecialities,
  deleteSpeciality,
  clearSpeciality,
})(Card);
