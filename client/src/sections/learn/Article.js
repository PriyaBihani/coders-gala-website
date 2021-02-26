/* eslint-disable */
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Tooltip } from "react-tippy";
import { deleteArticle } from "../../actions/article";
import { connect } from "react-redux";
import ButtonRenderer from "../../layout/Button/ButtonRenderer";

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

  function scrollTo(element) {
    window.scroll({
      behavior: "smooth",
      left: 0,
      top: "0px",
    });
  }

  return (
    <div className="row read-icon">
      <div className=" read col-10">
        <div className="item">
          <a
            type="button"
            onClick={() => {
              readArticle(article);
              const pos = document.querySelector(".card-container");
              if (window.innerWidth <= 500) {
                scrollTo(pos);
              }
            }}
            className="display-article"
          >
            <li className="article-name m-0">
              {article.ArticleName}{" "}
              <span className="article-action-icons">
                {isAdmin ? (
                  <>
                    <ButtonRenderer
                      isAdmin={isAdmin}
                      type="Edit"
                      link={`/article/update/${article._id}`}
                      data={article}
                      dataTarget=""
                    />
                    <ButtonRenderer
                      isAdmin={isAdmin}
                      type="Delete"
                      handler={handleDelete}
                      data={article}
                    />
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
                      const pos = document.querySelector(".card-container");
                      if (window.innerWidth <= 500) {
                        scrollTo(pos);
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
