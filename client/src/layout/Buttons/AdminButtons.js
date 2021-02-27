import { Tooltip } from "react-tippy";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Delete, Update, Add } from "../../assets/icons";

const TooltipWrapper = ({ title, position, children }) => {
  return (
    <Tooltip title={title} position={position} trigger="mouseenter">
      {children}
    </Tooltip>
  );
};

const AdminButtons = ({
  type,
  url,
  handler,
  isAdmin,
  dataTarget = "",
  data = {},
}) => {
  return isAdmin ? (
    <TooltipWrapper
      title={`${type} "${data.Name ? data.Name : data.ArticleName}"`}
      position={"top"}
    >
      <AdminButtonsWrapper
        type={type}
        url={url}
        handler={handler}
        dataTarget={dataTarget}
        data={data}
      />
    </TooltipWrapper>
  ) : null;
};

const AdminButtonsWrapper = ({ type, dataTarget, url, handler, data }) => {
  switch (type) {
    case "Add":
      return dataTarget == "" ? (
        <Link to={url}>
          <Add size="20" color="#A40E4C" />
        </Link>
      ) : (
        <button
          type="button"
          data-toggle="modal"
          className="add-topic-btn"
          data-target={dataTarget}
        >
          <Add size="20" color="#A40E4C" />
        </button>
      );
    case "Edit":
      return dataTarget != "" ? (
        <a
          className="edit-topic-modal-toggle"
          data-toggle="modal"
          data-target={dataTarget}
        >
          <Update size="20" color="#A40E4C" />
        </a>
      ) : (
        <Link to={url}>
          <Update size="20" color="#ffbf00" />
        </Link>
      );
    case "Delete":
      return (
        <a className="edit-topic-modal-toggle">
          <Delete
            onClick={() => {
              handler(data);
            }}
            size="20"
            color="crimson"
          />
        </a>
      );
    default:
      return null;
  }
};

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, null)(AdminButtons);
