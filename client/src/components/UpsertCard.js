import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "../layout";
import { serviceGet } from "../helpers";
import { addSpeciality, editSpeciality } from "../actions";
import Editor from "../editor/editor";

const UpsertCard = ({
  addSpeciality,
  editSpeciality,
  edit,
  match,
  handler,
}) => {
  const [state, setState] = useState({});
  const [data, setData] = useState({});

  useEffect(async () => {
    if (edit) {
      const res = await serviceGet(
        `api/speciality/get/${match.params.specialityName}`
      );
      const { Name, imageUrl, ArticleContent, _id } = res.data.speciality;
      setData({ Name, imageUrl, ArticleContent, _id });
    }
  }, []);
  console.log(edit, data);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit) editSpeciality(state, data._id);
    else addSpeciality(state);
  };

  return (
    <div className="container mt-4">
      <form className="mt-5">
        <div className="form-group">
          <input
            type="text"
            id="Name"
            required
            placeholder="Speciality Name"
            className="form-control"
            defaultValue={edit ? data && data.Name : ""}
            onChange={handleChange}
          />
          <br />
          <input
            required
            type="text"
            id="imageUrl"
            onChange={handleChange}
            placeholder="Image URL"
            className="form-control"
            defaultValue={edit ? data && data.imageUrl : ""}
          />
          <br />
          {!edit && (
            <>
              <input
                required
                type="text"
                id="alt"
                onChange={handleChange}
                placeholder="Image alt text"
                className="form-control"
              />
              <br />
            </>
          )}

          <div className="ql-snow">
            {edit ? (
              data && data.ArticleContent ? (
                <Editor
                  required
                  defaultValue={data && data.ArticleContent}
                  className="ql-editor"
                  handleEditor={handleEditor}
                />
              ) : null
            ) : (
              <Editor
                required
                defaultValue=""
                className="ql-editor"
                handleEditor={handleEditor}
              />
            )}
          </div>

          <div className="add-article-button">
            <Button onClick={handler()} type="submit">
              {edit ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { addSpeciality, editSpeciality })(UpsertCard);
