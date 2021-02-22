import React, { useState } from "react";
import { servicePost } from "../../helpers/api";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { editTopic } from "../../actions/topic";

const EditTopic = ({
  name,
  Locked,
  id,
  editTopic,
  specialityName,
  modalId,
}) => {
  const [locked, setLocked] = useState(Locked && Locked);
  const [Name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(locked, name);
    editTopic({ locked, Name }, id, specialityName);
    toast("Updated");
  };

  return (
    <div className="container m-0 p-0 ">
      <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content newsletter">
            <div className="modal-header">
              <h4 className="modal-title title" id="exampleModalLabel">
                Edit Topic
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
                    defaultValue={name}
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
                  <button
                    type="submit"
                    className="btn button-outline float-right m-3"
                  >
                    Update
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

export default connect(null, { editTopic })(EditTopic);
