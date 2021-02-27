import React, { useEffect } from 'react';
import { Button, AdminButtons } from '../../layout';
import { connect } from 'react-redux';
import { getSpecialities, deleteSpeciality } from '../../actions';

const Card = ({ getSpecialities, specialities, deleteSpeciality }) => {
  useEffect(async () => {
    console.log(specialities);
    if (specialities.length == 0) {
      getSpecialities();
    }
  }, []);

  const handleDelete = (item) => {
    // Got to helper, check
    const confirm = window.prompt(
      `You sure want to delete "${item.Name}" ? Y or N (Deleting a speciality will lead to deletion of all topics and articles inside it) `
    );
    if (confirm === 'Y') {
      deleteSpeciality(item._id);
    }
  };

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
                      <AdminButtons
                        type="Edit"
                        url={'/updatespeciality/' + item.Name}
                      />
                      <AdminButtons
                        type="Delete"
                        handler={() => {
                          handleDelete(item);
                        }}
                      />
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
});

export default connect(mapStateToProps, {
  getSpecialities,
  deleteSpeciality,
})(Card);
