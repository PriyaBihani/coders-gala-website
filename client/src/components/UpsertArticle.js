/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import Editor from '../editor/editor';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { addArticle, editArticle, getArticle } from '../actions/article';
import { ChevronsUp } from '../assets/icons';

const UpsertArticle = (props) => {
  const {
    addArticle,
    specialities,
    editArticle,
    getArticle,
    prevArticle,
  } = props;
  const [ArticleContent, setArticleContent] = useState('');
  const [ArticleName, setArticleName] = useState('');
  const [keywords, setArticleKeywords] = useState('');
  // const [prevArticle, setprevArticle] = useState();
  const [Loading, setLoading] = useState(false);
  const { topicId } = props.match.params;
  function scrollTo(element) {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.offsetTop,
    });
  }
  const goToTop = () => {
    scrollTo(document.getElementById('nav'));
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
      ArticleName: ArticleName == '' ? prevArticle.ArticleName : ArticleName,
      keywords: keywords == '' ? prevArticle.keywords : keywords,
      ArticleContent:
        ArticleContent == '' ? prevArticle.ArticleContent : ArticleContent,
    };
    editArticle(data, prevArticle._id, specialities.speciality.Name);
    toast('Article updated successfully');
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    addArticle(
      { ArticleContent, ArticleName, keywords },
      topicId,
      specialities.speciality.Name
    );
    toast('Article added successfully');
  };

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
                : 'Add a Article'}
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
                    props.edit ? prevArticle && prevArticle.ArticleName : ''
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
                    props.edit ? prevArticle && prevArticle.keywords : ''
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
                  <Button
                    className="btn btn-outline-primary m-3"
                    onClick={props.edit ? handleEdit : handleAdd}
                  >
                    {props.edit ? 'Update' : 'Add'} Update
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="top-icon">
          <ChevronsUp size="50" color="#dc143c" onClick={goToTop} />
        </div>
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
})(UpsertArticle);
