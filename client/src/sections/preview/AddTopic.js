/* eslint-disable */
import React, { useState } from "react";
import { Tooltip } from "react-tippy";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import AdminButtons from "../../layout/Buttons/AdminButtons";
import { addTopic } from "../../actions/topic";

const AddTopicName = (props) => {
  const { addTopic } = props;
  const [locked, setLocked] = useState(true);
  const [Name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ locked, Name, SpecialityId: props.speciality._id });
    // const res = await servicePost(
    //   `api/topic/add`,
    //   { locked, Name, SpecialityId: props.speciality._id },
    //   {
    //     "Content-Type": "application/json",
    //   }
    // );
    addTopic(
      { locked, Name, SpecialityId: props.speciality._id },
      props.specialityName
    );
    toast("Topic Added successfully");
    console.log(props.specialityName);
  };

  return (
    <div className="container add-topic m-0 p-0 ">
<<<<<<< HEAD:client/src/sections/learn/AddTopic.js
      {' '}
      <div className="add-topic-btn">
        <AdminButtons
          type="Add"
          data-target="#exampleModal12"
          data={{ Name: 'Add Topic' }}
        />
        {/* <Tooltip
          // options
          title={`Add Topic to "${props.specialityName}"`}
          position="bottom"
          trigger="mouseenter"
        >
          <i style={{ marginLeft: '20px' }} className="fa fa-plus"></i>
        </Tooltip> */}
      </div>
=======
      {" "}
      <AdminButtons
        type="Add"
        dataTarget={"#exampleModal12"}
        data={{ Name: "Add topic" }}
      />
>>>>>>> 0b52cc024fa1a7892c38a2d1610efe6131d3361d:client/src/sections/preview/AddTopic.js
      <div
        className="modal fade"
        id="exampleModal12"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content newsletter">
            <div className="modal-header">
              <h4 className="modal-title title" id="exampleModalLabel">
                Add a Topic Name
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body content">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    id="Name"
                    placeholder="Name of the topic"
                    className="form-control"
                  />
                  <br />
                  <div className="add-topic-modal lock-container">
                    <span
                      onClick={() => {
                        document
                          .querySelector(".add-topic-modal .lock")
                          .classList.toggle("unlocked");
                        setLocked(!locked);
                      }}
                      className="lock"
                    ></span>
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="btn button-outline float-right m-3"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { addTopic })(AddTopicName);