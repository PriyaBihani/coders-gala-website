import React, { useState, useEffect } from 'react';
import Editor from '../editor/editor';
import { serviceGet } from '../helpers/api';
import { connect } from 'react-redux';
import { addSpeciality, editSpeciality } from '../actions/speciality';

const UpsertCard = ({ addSpeciality, editSpeciality, edit, match }) => {
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
            defaultValue={edit ? data && data.Name : ''}
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
            defaultValue={edit ? data && data.imageUrl : ''}
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
            {' '}
            <Editor
              required
              defaultValue={edit ? data && data.ArticleContent : ''}
              className="ql-editor"
              handleEditor={handleEditor}
            />
          </div>

          <div className="add-article-button">
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              type="submit"
              className="btn btn-outline-primary m-3"
            >
              {edit ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { addSpeciality, editSpeciality })(UpsertCard);
