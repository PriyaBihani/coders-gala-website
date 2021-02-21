import React, { useEffect } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";

const PreviewArticle = ({ SelectedArticle, specialityName }) => {
  const slicedArticle = SelectedArticle.ArticleName;
  return (
    <div className="card">
      <div>
        <div>
          <h1 className="material-icons card-header">
            {SelectedArticle.ArticleName}
            <br />
            <div>
              <h3 className="float-right"></h3>
            </div>
          </h1>
          <hr />
          <div className="ql-snow">
            <div
              className="card-no-body ql-editor"
              dangerouslySetInnerHTML={{
                __html: SelectedArticle.ArticleContent.slice(0, 2000),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div>
        <Link
          onClick={() => {
            $("html, body").animate({ scrollTop: 10 }, 200);
          }}
          to={
            "/" +
            specialityName +
            "/" +
            "read" +
            "/" +
            slicedArticle.replace(/\s/g, "-")
          }
        >
          <h2 className="link">Read More.....</h2>
        </Link>
      </div>
    </div>
  );
};

export default PreviewArticle;
