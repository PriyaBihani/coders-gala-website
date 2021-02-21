/* eslint-disable */
import React, { useState, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { servicePost } from "../../helpers/api";

const DeleteButton = (props) => {
  const [Deleting, setDeleting] = useState(false);
  const [Deleted, setDeleted] = useState(false);

  const handleDelete = async (collectionName, id) => {
    const confirm = window.prompt("You sure want to delete? Y or N ");
    if (confirm === "Y") {
      setDeleting(true);
      console.log(collectionName, id);
      const headers = {
        "Content-Type": "application/json",
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
    position = "bottom";
  } else {
    position = "right";
  }
  var size = "small";

  return (
    <span>
      {size === "small" ? (
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
