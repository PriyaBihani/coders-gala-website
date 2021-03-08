import React, { useState, useEffect } from "react";
import { Button, LockButton } from "../layout";
import { connect } from "react-redux";
import { addTopic, editTopic } from "../actions/topic";
import { toast } from "react-toastify";

const UpsertTopic = ({
  speciality,
  match,
  addTopic,
  editTopic,
  location,
  edit,
}) => {
  const [data, setData] = useState({ locked: false });

  useEffect(() => {
    setData({
      locked: location.props && location.props.isLocked,
      Name: location.props && location.props.name,
    });
  }, [location.props]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!edit) {
      addTopic(
        { ...data, SpecialityId: speciality._id },
        match.params.specialityName
      );
      toast("Topic Added successfully");
    } else {
      editTopic(data, match.params.topicId, match.params.specialityName);
      toast("Updated");
    }
  };

  return (
    <div className="upsert-container">
      <div className="upsert-topic-form">
        <h3>{edit ? "Update" : "Add"} Topic</h3>
        <form>
          {" "}
          <div className="form-input">
            <input
              onChange={(e) => {
                setData((prev) => ({ ...prev, Name: e.target.value }));
              }}
              defaultValue={location.props && location.props.name}
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="form-button">
            <LockButton
              isLocked={data.locked}
              handler={() => {
                setData((prev) => ({ ...prev, locked: !prev.locked }));
              }}
            />
          </div>
          <Button isButton={true} handler={handleSubmit}>
            {edit ? "Update" : "Add"}
          </Button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  speciality: state.speciality.speciality,
});

export default connect(mapStateToProps, { addTopic, editTopic })(UpsertTopic);
