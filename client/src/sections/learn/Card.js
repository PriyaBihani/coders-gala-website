import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import DeleteButton from "../../layout/Button/DeleteButton";
import SomeButton from "../../layout/Button/button";
import { connect } from "react-redux";
import $ from "jquery";
import { serviceGet, servicePost } from "../../helpers/api";
import {
  getSpecialities,
  deleteSpeciality,
  clearSpeciality,
} from "../../actions/speciality";

const Card = ({
  getSpecialities,
  specialities,
  deleteSpeciality,
  isAdmin,
  clearSpeciality,
}) => {
  console.log(isAdmin);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 600) {
        $(".container .card .contentBx").css("height", "150px");
      }
    }
  });

  const [learningCards, setLearningCards] = useState([{}]);

  useEffect(async () => {
    // getSpecialities();
    console.log(specialities);
    if (specialities.length == 0) {
      getSpecialities();
    }
  }, []);

  const handleDelete = (item) => {
    const confirm = window.prompt(
      `You sure want to delete "${item.Name}" ? Y or N (Deleting a speciality will lead to deletion of all topics and articles inside it) `
    );
    if (confirm === "Y") {
      deleteSpeciality(item._id);
    }
  };

  console.log("data");

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
                    <div className="contentBx">
                      <h2> {item.Name}</h2>
                      {isAdmin ? (
                        <Row>
                          <Col>
                            <NavLink
                              to={"/updatespeciality/" + item.Name}
                              rel="nofollow"
                            >
                              <img
                                src="https://www.svgrepo.com/show/241804/edit.svg"
                                style={{ width: "20px" }}
                                alt={"edit" + item.Name}
                              />
                            </NavLink>
                            <a
                              onClick={() => {
                                handleDelete(item);
                              }}
                              style={{ marginLeft: "10px" }}
                              href="#"
                            >
                              <svg className="svg-icon del" viewBox="0 0 20 20">
                                <path
                                  fill="none"
                                  d="M7.083,8.25H5.917v7h1.167V8.25z M18.75,3h-5.834V1.25c0-0.323-0.262-0.583-0.582-0.583H7.667
								c-0.322,0-0.583,0.261-0.583,0.583V3H1.25C0.928,3,0.667,3.261,0.667,3.583c0,0.323,0.261,0.583,0.583,0.583h1.167v14
								c0,0.644,0.522,1.166,1.167,1.166h12.833c0.645,0,1.168-0.522,1.168-1.166v-14h1.166c0.322,0,0.584-0.261,0.584-0.583
								C19.334,3.261,19.072,3,18.75,3z M8.25,1.833h3.5V3h-3.5V1.833z M16.416,17.584c0,0.322-0.262,0.583-0.582,0.583H4.167
								c-0.322,0-0.583-0.261-0.583-0.583V4.167h12.833V17.584z M14.084,8.25h-1.168v7h1.168V8.25z M10.583,7.083H9.417v8.167h1.167V7.083
								z"
                                ></path>
                              </svg>
                            </a>
                          </Col>
                        </Row>
                      ) : null}
                      <Link to={"/learn/" + item.Name}>
                        <SomeButton buttonText={"Start Now"} />
                      </Link>
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
