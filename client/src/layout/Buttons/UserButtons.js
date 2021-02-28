import { Link } from "react-router-dom";

export const Button = ({ children, url, dark, bg, isButton, handler }) => {
  return typeof isButton == "undefined" ? (
    <Link to={url ? url : "/"}>
      <div
        className={`button ${dark && "dark"}`}
        style={{ backgroundColor: `${bg && "bg"}` }}
      >
        <span>{children}</span>
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
  ) : (
    <div
      className={`button ${dark && "dark"}`}
      style={{ backgroundColor: `${bg && "bg"}` }}
      onClick={(e) => {
        handler(e);
      }}
    >
      <span>{children}</span>
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
  );
};
