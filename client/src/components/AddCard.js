import React, { useState, useEffect } from "react";
import Editor from "../editor/editor";
import { servicePost } from "../helpers/api";
import { connect } from "react-redux";
import { addSpeciality } from "../actions/speciality";

const AddCard = ({ addSpeciality }) => {
  const [state, setState] = useState({});

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const handleEditor = (html) => {
    setState({
      ...state,
      ArticleContent: html,
    });
  };

  const handleSubmit = async (e, data) => {
    e.preventDefault();

    addSpeciality(data);
  };

  return (
    <div className="container mt-4">
      <form className="mt-5">
        <div className="form-group">
          <input
            type="text"
            id="Name"
            required
            onChange={handleChange}
            placeholder="Speciality Name"
            className="form-control"
          />
          <br />
          <input
            required
            type="text"
            id="imageUrl"
            onChange={handleChange}
            placeholder="Image URL"
            className="form-control"
          />
          <br />
          <input
            required
            type="text"
            id="alt"
            onChange={handleChange}
            placeholder="Image alt text"
            className="form-control"
          />
          <br />

          <div className="ql-snow">
            <Editor
              required
              className="ql-editor"
              handleEditor={handleEditor}
              defaultValue=""
            />
          </div>

          <div className="add-article-button">
            <button
              onClick={(e) => {
                handleSubmit(e, state);
              }}
              type="submit"
              className="btn btn-outline-primary m-3"
            >
              Add
            </button>

            {/* <div className="text-center">
              <div className={"text-center " + "text-" + color}>
                {message && message}
              </div>
            </div> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { addSpeciality })(AddCard);
