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
}) =>
  isAdmin ? (
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

const AdminButtonsWrapper = ({ type, url, handler, dataTarget, data }) => {
  switch (type) {
    case "Add":
      return dataTarget.length > 0 ? (
        <button
          type="button"
          data-toggle="modal"
          className="add-topic-btn"
          data-target="#exampleModal12"
        >
          <Add size="20" color="#A40E4C" />
        </button>
      ) : (
        <Link to={url}>
          <Add size="20" color="#000" />
        </Link>
      );
    case "Edit":
      return (
        <Link
          to={{
            pathname: url,
            props: { name: data.Name, isLocked: data.locked },
          }}
        >
          <Update size="20" color="#000" />
        </Link>
      );

    case "Delete":
      return (
        <a
          onClick={() => {
            handler(data);
          }}
          className="edit-topic-modal-toggle"
        >
          <Delete size="20" color="crimson" />
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
