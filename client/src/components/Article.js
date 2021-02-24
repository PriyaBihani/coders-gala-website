import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { Seo } from '../helpers';
import { ChevronsUp } from '../assets/icons';
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
    <>
      <div className="selected-article">
        <div>
          <Seo
            title={`Before starting ${specialityId}`}
            description={specialityId}
            meta={[{ name: 'robots', content: 'index follow' }]}
          />
          <Row className="full-view-article p-2">
            <Col sm={2}>{/* Adds Here */}</Col>

            <Col id="top" style={{ padding: '0px' }} sm={8}>
              <div className="ql-snow">
                <div
                  className="full-article ql-editor"
                  dangerouslySetInnerHTML={{
                    __html:
                      Id === 'before-starting'
                        ? props.specialities?.speciality?.ArticleContent
                        : article && article.ArticleContent,
                  }}
                ></div>
              </div>
              <div className="top-icon">
                <ChevronsUp size="50" color="#dc143c" onClick={goToTop} />
              </div>
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
  );
};

const mapStateToProps = (state) => ({
  specialities: state.speciality,
});

export default connect(mapStateToProps, { getSpeciality })(Article);
