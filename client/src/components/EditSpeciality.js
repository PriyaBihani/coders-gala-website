import React, { useState, useEffect } from "react";
import Editor from "../editor/editor";
import { serviceGet, servicePost } from "../helpers/api";
import { connect } from "react-redux";
import { editSpeciality } from "../actions/speciality";

const EditSpeciality = (props) => {
  const { editSpeciality } = props;
  const [data, setData] = useState({});
  const [state, setState] = useState({});

  useEffect(async () => {
    const res = await serviceGet(
      `api/speciality/get/${props.match.params.specialityName}`
    );
    const { Name, imageUrl, ArticleContent, _id } = res.data.speciality;
    setData({ Name, imageUrl, ArticleContent, _id });
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editSpeciality(state, data._id);
  };

  const handleEditor = (html) => {
    setState({ ...state, ArticleContent: html });
  };

  console.log(data);

  return (
    <div className="container mt-4">
      <form>
        {data && data.ArticleContent ? (
          <div className="form-group">
            <input
              type="text"
              id="Name"
              defaultValue={data && data.Name}
              onChange={handleChange}
              placeholder="Speciality Name"
              className="form-control"
            />
            <br />
            <input
              defaultValue={data && data.imageUrl}
              type="text"
              id="imageUrl"
              onChange={handleChange}
              placeholder="Image URL"
              className="form-control"
            />
            <br />

            <div className="ql-snow">
              {" "}
              <Editor
                defaultValue={data && data.ArticleContent}
                className="ql-editor"
                handleEditor={handleEditor}
              />
            </div>

            <div className="add-article-button">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-outline-primary m-3"
              >
                Add
              </button>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default connect(null, { editSpeciality })(EditSpeciality);
