import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Delete, Update, Add } from '../../assets/icons';

const TooltipWrapper = ({ title, position, children }) => {
  return (
    <Tooltip title={title} position={position} trigger="mouseenter">
      {children}
    </Tooltip>
  );
};

const ButtonRenderer = ({ type, link, handler, isAdmin, dataTarget, data }) =>
  isAdmin ? (
    <TooltipWrapper
      title={`${type} "${data.Name ? data.Name : data.ArticleName}"`}
      position={'top'}
    >
      <ButtonRendererWrapper
        type={type}
        link={link}
        handler={handler}
        dataTarget={dataTarget}
        data={data}
      />
    </TooltipWrapper>
  ) : null;

const ButtonRendererWrapper = ({ type, link, handler, dataTarget, data }) => {
  switch (type) {
    case 'Add':
      return (
        <Link to={link}>
          <Add size="20" color="#A40E4C" />
        </Link>
      );
    case 'Edit':
      return dataTarget != '' ? (
        <a
          className="edit-topic-modal-toggle"
          data-toggle="modal"
          data-target={dataTarget}
        >
          <Update size="20" color="#A40E4C" />
        </a>
      ) : (
        <Link to={link}>
          <Update size="20" color="#ffbf00" />
        </Link>
      );
    case 'Delete':
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

export default connect(mapStateToProps, null)(ButtonRenderer);
