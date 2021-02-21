/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Editor from "../editor/editor";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import $ from "jquery";
import { servicePost, serviceGet } from "../helpers/api";
import { addArticle, editArticle, getArticle } from "../actions/article";

const AddArticle = (props) => {
  const {
    addArticle,
    specialities,
    editArticle,
    getArticle,
    prevArticle,
  } = props;
  const [ArticleContent, setArticleContent] = useState("");
  const [ArticleName, setArticleName] = useState("");
  const [keywords, setArticleKeywords] = useState("");
  // const [prevArticle, setprevArticle] = useState();
  const [Loading, setLoading] = useState(false);
  const { topicId } = props.match.params;
  const goToTop = () => {
    $("html, body").animate({ scrollTop: 10 }, 600);
  };

  useEffect(async () => {
    if (props.edit) {
      getArticle(props.match.params.articleId);
    }
  }, []);

  const handleEditor = (html) => {
    setArticleContent(html);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log(ArticleName);
    console.log(keywords);
    const data = {
      ArticleName: ArticleName == "" ? prevArticle.ArticleName : ArticleName,
      keywords: keywords == "" ? prevArticle.keywords : keywords,
      ArticleContent:
        ArticleContent == "" ? prevArticle.ArticleContent : ArticleContent,
    };
    // const res = await servicePost(
    //   `api/article/update/${prevArticle._id}`,
    //   data,
    //   {
    //     "Content-Type": "application/json",
    //   }
    // );
    editArticle(data, prevArticle._id, specialities.speciality.Name);
    toast("Article updated successfully");
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    addArticle(
      { ArticleContent, ArticleName, keywords },
      topicId,
      specialities.speciality.Name
    );
    // const res = await servicePost(
    //   `api/article/add/${topicId}`,
    //   { ArticleContent, ArticleName, keywords },
    //   {
    //     "Content-Type": "application/json",
    //   }
    // );
    toast("Article added successfully");

    // console.log({ ArticleContent, ArticleName, keywords });
  };

  // console.log(this.props);
  // console.log("render");

  // console.log(prevArticle);

  return (
    <Row className="full-view-article p-2">
      <div className="share-icons"></div>

      <Col sm={1}></Col>

      <Col id="top" sm={10}>
        <div className="">
          <div className="">
            <h4 className="" id="">
              {props.edit
                ? `Update Article - ${prevArticle && prevArticle.ArticleName}`
                : "Add a Article"}
            </h4>
          </div>

          <div className="modal-body content">
            <form>
              <div className="form-group">
                <input
                  type="text"
                  id="ArticleName"
                  placeholder="Article Name"
                  className="form-control"
                  defaultValue={
                    props.edit ? prevArticle && prevArticle.ArticleName : ""
                  }
                  onChange={(e) => {
                    setArticleName(e.target.value);
                  }}
                />
                <br />

                <input
                  type="text"
                  id="keywords"
                  placeholder="Article Description"
                  className="form-control"
                  defaultValue={
                    props.edit ? prevArticle && prevArticle.keywords : ""
                  }
                  onChange={(e) => {
                    setArticleKeywords(e.target.value);
                  }}
                />

                <br />

                <>
                  {props.edit ? (
                    prevArticle && prevArticle.ArticleContent ? (
                      <Editor
                        handleEditor={handleEditor}
                        defaultValue={prevArticle && prevArticle.ArticleContent}
                      />
                    ) : null
                  ) : (
                    <Editor handleEditor={handleEditor} defaultValue="" />
                  )}
                </>

                <div className="add-article-button">
                  {props.edit ? (
                    <button
                      className="btn btn-outline-primary m-3"
                      onClick={handleEdit}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-primary m-3"
                      onClick={handleAdd}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        <a href="#">
          <i
            onClick={goToTop}
            rel="nofollow"
            id="go-to-top"
            className=" top-icon fas fa-angle-double-up"
          ></i>
        </a>
      </Col>

      <Col sm={1}></Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  specialities: state.speciality,
  prevArticle: state.article.selectedArticle,
});

export default connect(mapStateToProps, {
  addArticle,
  editArticle,
  getArticle,
})(AddArticle);
