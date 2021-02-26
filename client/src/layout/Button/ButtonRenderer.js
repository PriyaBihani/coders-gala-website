import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tippy";
import { Delete, Update } from "../../assets/icons";

const TooltipWrapper = (props) => {
  return (
    <Tooltip title={props.title} position={props.position} trigger="mouseenter">
      {props.render()}
    </Tooltip>
  );
};

const ButtonRenderer = ({ type, link, handler, isAdmin, dataTarget, data }) => {
  if (type == "Edit") {
    if (dataTarget != "") {
      return (
        <TooltipWrapper
          title={`${type} "${data.Name ? data.Name : data.ArticleName}"`}
          position={"top"}
          render={() => {
            return (
              <>
                {" "}
                {isAdmin ? (
                  <a
                    className="edit-topic-modal-toggle"
                    data-toggle="modal"
                    data-target={dataTarget}
                  >
                    <Update size="20" color="#A40E4C" />
                  </a>
                ) : null}
              </>
            );
          }}
        />
      );
    } else {
      return (
        <TooltipWrapper
          title={`${type} "${data.Name ? data.Name : data.ArticleName}"`}
          position={"top"}
          render={() => {
            return (
              <>
                {" "}
                {isAdmin ? (
                  <Link to={link}>
                    <Update size="20" color="#ffbf00" />
                  </Link>
                ) : null}
              </>
            );
          }}
        />
      );
    }
  }
  if (type == "Delete") {
    return (
      <TooltipWrapper
        title={`${type} "${data.Name ? data.Name : data.ArticleName}"`}
        position={"top"}
        render={() => {
          return (
            <>
              {" "}
              {isAdmin ? (
                <a className="edit-topic-modal-toggle">
                  <Delete
                    onClick={() => {
                      handler(data);
                    }}
                    size="20"
                    color="crimson"
                  />
                </a>
              ) : null}
            </>
          );
        }}
      />
    );
  }
  if (type == "Add") {
    if (dataTarget != "") {
    } else {
      return (
        <TooltipWrapper
          title={`${type} "${data.Name}"`}
          position={"top"}
          render={() => {
            return (
              <>
                {" "}
                {isAdmin ? (
                  <Link to={link}>
                    <img
                      className="add-article-btn"
                      src="https://www.svgrepo.com/show/56237/add.svg"
                      alt=""
                    />
                  </Link>
                ) : null}
              </>
            );
          }}
        />
      );
    }
  }
};

export default ButtonRenderer;
