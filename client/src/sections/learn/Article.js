/* eslint-disable */
import React from "react";
import { NavLink, Link } from "react-router-dom";
import $ from "jquery";
import { Tooltip } from "react-tippy";
import { deleteArticle } from "../../actions/article";
import { connect } from "react-redux";

const Article = ({
  readArticle,
  article,
  item,
  isAdmin,
  displayMode,
  deleteArticle,
  topic,
  specialities,
}) => {
  var readIconUrl;
  if (displayMode === "light") {
    readIconUrl = "https://www.svgrepo.com/show/21266/open-book.svg";
  } else {
    readIconUrl = "https://www.svgrepo.com/show/1110/reader.svg";
  }

  const handleDelete = (data) => {
    const { ArticleName, _id } = data;
    const confirm = window.prompt(
      `You sure want to delete "${ArticleName}" ? Y or N `
    );
    if (confirm === "Y") {
      deleteArticle(_id, topic._id, specialities.speciality.Name);
    }
  };

  return (
    <div className="row">
      <div className=" read col-10">
        <div className="item">
          <a
            type="button"
            onClick={() => {
              readArticle(article);
              const pos = $(".card-container").offset().top;
              if (window.innerWidth <= 500) {
                $("html, body").animate({ scrollTop: pos }, 69);
              }
            }}
            className="display-article"
          >
            <li className="article-name m-0">
              {article.ArticleName}{" "}
              <span className="article-action-icons">
                {isAdmin ? (
                  <>
                    <Tooltip
                      // options
                      title={`Edit "${article.ArticleName}"`}
                      position="bottom"
                      trigger="mouseenter"
                    >
                      <Link to={`/article/update/${article._id}`}>
                        <i className="fa fa-edit"></i>
                      </Link>
                    </Tooltip>
                    <Tooltip
                      // options
                      title={`Delete "${article.ArticleName}"`}
                      position="bottom"
                      trigger="mouseenter"
                    >
                      <a
                        onClick={() => {
                          handleDelete(article);
                        }}
                      >
                        <i
                          style={{ color: "crimson" }}
                          className="fa fa-trash"
                        ></i>
                      </a>
                    </Tooltip>
                  </>
                ) : null}
                <Tooltip
                  // options
                  title={`Read "${article.ArticleName}"`}
                  position="top"
                  trigger="mouseenter"
                >
                  <a
                    type="button"
                    onClick={() => {
                      readArticle(article);
                      const pos = $(".card-container").offset().top;
                      if (window.innerWidth <= 500) {
                        $("html, body").animate({ scrollTop: pos }, 69);
                      }
                    }}
                  >
                    <span>
                      <img
                        src={readIconUrl}
                        style={{ width: "20px" }}
                        alt={"read " + article.ArticleName}
                      />
                    </span>
                  </a>
                </Tooltip>
              </span>
            </li>
          </a>
        </div>
      </div>
      <div className=" col-2">
        <div className="update-delete float-right"></div>
      </div>
    </div>
  );
};

export default connect(null, { deleteArticle })(Article);
