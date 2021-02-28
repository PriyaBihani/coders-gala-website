import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import { Read } from '../../assets/icons';

export const Button = ({
  title,
  position = 'top',
  children,
  url,
  dark,
  bg,
}) => (
  <Tooltip title={title} position={position} trigger="mouseenter">
    <Link to={url ? url : '/'}>
      <div
        className={`button ${dark && 'dark'}`}
        style={{ backgroundColor: `${bg && 'bg'}` }}
      >
        {children ? <span>{children}</span> : <Read size="20" />}

        <svg>
          <polyline
            className="o1"
            points="0 0, 150 0, 150 55, 0 55, 0 0"
          ></polyline>
          <polyline
            className="o2"
            points="0 0, 150 0, 150 55, 0 55, 0 0"
          ></polyline>
        </svg>
      </div>
    </Link>
  </Tooltip>
);
