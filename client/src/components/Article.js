import React, { useState, useEffect } from 'react';
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Seo } from '../helpers';
import Footer from '../layout/Footer/Footer';
import { servicePost } from '../helpers/api';
import { getSpeciality } from '../actions/speciality';

const ShareArticle = ({ NId, url }, props) => {
  const value = 'https://codersgala.com/WebDevelopment/read/' + NId;

  const [copied, setCopied] = useState(false);

  function actionToggle() {
    document.querySelector('.action').classList.toggle('active');
  }

  return (
    <>
      <div class="action" onClick={actionToggle}>
        <span>
          <img
            style={{ width: '25px' }}
            src="https://www.svgrepo.com/show/19199/share.svg"
            alt=""
          />
        </span>
        <ul>
          <li>
            {/* {copied ? (
              <article className="copyto">Copied to </article>
            ) : (
              <article className="copyto">Copy to</article>
            )} */}
            {/* <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
              <img
                alt={"copy link of " + NId}
                style={{ width: "25px", marginLeft: "20px" }}
                src="https://www.svgrepo.com/show/30388/clipboard.svg"
                alt=""
              />
            </CopyToClipboard> */}
          </li>

          <li>
            <a
              className="whatsapp-icon"
              rel="noopener noreferrer"
              href={`https://api.whatsapp.com/send?text=Hey look i just found out this Amazing article on "${NId}",Check it out : ${url}`}
              target="_blank"
            >
              Share on
              <img
                style={{ width: '25px', marginLeft: '20px' }}
                src="https://www.svgrepo.com/show/303150/whatsapp-symbol-logo.svg"
                alt={'share ' + NId + ' on Whatsapp'}
              />
            </a>
          </li>

          <li>
            <a
              className="mail-icon"
              href={`mailto:?Subject=${
                'Article on ' + NId
              }&Body=Hey look i just found out this Amazing article on "${NId}",Check it out : ${url}`}
              target="_top"
              rel="nofollow"
            >
              Share on
              <img
                style={{ width: '25px', marginLeft: '20px' }}
                className="share-image"
                src="https://www.svgrepo.com/show/303161/gmail-icon-logo.svg"
                alt={'share ' + NId + ' on Gmail'}
              />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

const Article = (props) => {
  const { getSpeciality } = props;
  const { specialityId, topicId, Id } = props.match.params;

  useEffect(() => {
    if (!props.specialities.speciality && Id == 'before-starting') {
      getSpeciality(props.match.params.specialityId);
    }
  }, []);

  const [article, setArticle] = useState({});
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

  const NId = Id.replace(/-/g, ' ');
  var url;
  if (typeof window !== 'undefined') {
    url = window.location.href;
  }

  const getArticle = async (NId) => {
    const res = await servicePost(
      `api/article/get`,
      {
        articleName: NId,
      },
      {
        'Content-Type': 'application/json',
      }
    );
    return res.data.article;
  };

  useEffect(async () => {
    const article = await getArticle(NId);
    setArticle(article);
  }, []);

  return (
    <div>
      {Id === 'before-starting' ? (
        <>
          <div className="selected-article">
            <div>
              <Seo
                title={`Before starting ${specialityId}`}
                description={specialityId}
                meta={[{ name: 'robots', content: 'index follow' }]}
              />
              <Row className="full-view-article p-2">
                <Col sm={2}>
                  {/* ads here
                  <br />
                  ads here
                  <br />
                  ads here
                  <br />
                  ads here
                  <br />
                  ads here
                  <br />
                  ads here
                  <br /> */}
                </Col>

                <Col id="top" style={{ padding: '0px' }} sm={8}>
                  <div className="ql-snow">
                    <div
                      className="full-article ql-editor"
                      dangerouslySetInnerHTML={{
                        __html:
                          props.specialities &&
                          props.specialities.speciality &&
                          props.specialities.speciality.ArticleContent,
                      }}
                    ></div>
                  </div>
                  <a rel="nofollow" href="#">
                    <img
                      onClick={goToTop}
                      className="top-icon"
                      id="go-to-top"
                      style={{ width: '30px' }}
                      src="https://www.svgrepo.com/show/247787/up-arrow-upload.svg"
                      alt={'Go on Top of '}
                    />
                  </a>
                </Col>

                <Col className="full-page ad" sm={2}></Col>
              </Row>
            </div>
          </div>
          {/* <Link to={"/learn/" + specialityId}>
      <img
        className="back-btn"
        src="https://www.svgrepo.com/show/50213/back.svg"
        alt="back button"
      />
    </Link> */}
          <ShareArticle NId={NId} url={url} />
          <Footer />
        </>
      ) : (
        <>
          <div className="selected-article">
            <div>
              <Seo
                title={article && article.ArticleName}
                description={article && article.keywords}
                meta={[{ name: 'robots', content: 'index follow' }]}
              />
              <Row
                key={article && article._id}
                className="full-view-article p-2"
              >
                <Col sm={2}>
                  {/* ads here
                  <br />
                  ads here
                  <br />
                  ads here
                  <br />
                  ads here
                  <br />
                  ads here
                  <br />
                  ads here
                  <br /> */}
                </Col>

                <Col id="top" style={{ padding: '0px' }} sm={8}>
                  <div className="ql-snow">
                    <div
                      className="full-article ql-editor"
                      dangerouslySetInnerHTML={{
                        __html: article && article.ArticleContent,
                      }}
                    ></div>
                  </div>
                  <a rel="nofollow" href="#">
                    <img
                      onClick={goToTop}
                      className="top-icon"
                      id="go-to-top"
                      style={{ width: '30px' }}
                      src="https://www.svgrepo.com/show/247787/up-arrow-upload.svg"
                      alt={'Go on Top of ' + article && article.ArticleName}
                    />
                  </a>
                </Col>

                <Col className="full-page ad" sm={2}></Col>
              </Row>
            </div>
          </div>
          {/* <Link to={"/learn/" + specialityId}>
      <img
        className="back-btn"
        src="https://www.svgrepo.com/show/50213/back.svg"
        alt="back button"
      />
    </Link> */}
          <ShareArticle NId={NId} url={url} />
          <Footer />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  specialities: state.speciality,
});

export default connect(mapStateToProps, { getSpeciality })(Article);
