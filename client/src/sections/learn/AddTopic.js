/* eslint-disable */
import React, { useState } from 'react';
import { Tooltip } from 'react-tippy';
import { Spinner } from 'react-bootstrap';
import { servicePost } from '../../helpers/api';
import { connect } from 'react-redux';
import { addTopic } from '../../actions/topic';
import { toast } from 'react-toastify';

const AddTopicName = (props) => {
  const { addTopic } = props;
  const [locked, setLocked] = useState(true);
  const [Name, setName] = useState('');

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
    toast('Topic Added successfully');
    console.log(props.specialityName);
  };

  return (
    <div className="container add-topic m-0 p-0 ">
      {' '}
      <button
        type="button"
        data-toggle="modal"
        className="add-topic-btn"
        data-target="#exampleModal12"
      >
        <Tooltip
          // options
          title={`Add Topic to "${props.specialityName}"`}
          position="bottom"
          trigger="mouseenter"
        >
          <i style={{ marginLeft: '20px' }} className="fa fa-plus"></i>
        </Tooltip>
      </button>
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
                          .querySelector('.add-topic-modal .lock')
                          .classList.toggle('unlocked');
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
