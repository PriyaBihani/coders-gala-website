/* eslint-disable */
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Delete } from '../../assets/icons';
import { servicePost } from '../../helpers/api';

const DeleteButton = (props) => {
  const [Deleting, setDeleting] = useState(false);
  const [Deleted, setDeleted] = useState(false);

  const handleDelete = async (collectionName, id) => {
    const confirm = window.prompt('You sure want to delete? Y or N ');
    if (confirm === 'Y') {
      setDeleting(true);
      console.log(collectionName, id);
      const headers = {
        'Content-Type': 'application/json',
      };

      const res = await servicePost(
        `api/${collectionName}/delete/${id}`,
        {},
        headers
      );
      console.log(res);
    }
  };

  const width = window.innerWidth;
  var position;
  if (width < 500) {
    position = 'bottom';
  } else {
    position = 'right';
  }
  var size = 'small';

  return (
    <span>
      {size === 'small' ? (
        <button
          className="btn text-danger "
          onClick={() => {
            handleDelete(props.collectionName, props.id);
          }}
        >
          {Deleting && !Deleted ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <Delete size="20" />
          )}
        </button>
      ) : (
        <button className="btn btn-outline-danger btn-lg btn-block mr-3 mb-2 mt-2">
          Delete
        </button>
      )}
    </span>
  );
};

export default DeleteButton;
