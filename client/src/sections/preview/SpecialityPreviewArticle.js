import React from "react";
import { Link } from "react-router-dom";

const SpecialityPreviewArticle = ({ item, requiredSpeciality }) => {
  // console.log(requiredSpeciality);
  return (
    <div className="card">
      <h1 className="material-icons card-header ">
        Read This before You start...
      </h1>
      <hr />

      <div className="ql-snow" key={item && item.id}>
        <div
          key={item && item.id}
          className="card-no-body ql-editor"
          dangerouslySetInnerHTML={{
            __html: item && item.ArticleContent.slice(0, 1000),
          }}
        ></div>
        <div>
          <Link
            to={
              "/" + requiredSpeciality + "/" + "read" + "/" + "before-starting"
            }
          >
            <h2 className="link">Read More.....</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialityPreviewArticle;
