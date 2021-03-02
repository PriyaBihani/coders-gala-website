import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import Footer from '../layout/Footer/Footer';

import { getSpeciality } from '../actions';
import { servicePost, Seo, scrollTo, isClient } from '../helpers';
import { ChevronsUp, ChevronsLeft } from '../assets/icons';

const ShareArticle = ({ Nid, url }, props) => {
  const value = 'https://codersgala.com/WebDevelopment/read/' + Nid;

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
              href={`https://api.whatsapp.com/send?text=Hey look i just found out this Amazing article on "${Nid}",Check it out : ${url}`}
              target="_blank"
            >
              Share on
              <img
                style={{ width: '25px', marginLeft: '20px' }}
                src="https://www.svgrepo.com/show/303150/whatsapp-symbol-logo.svg"
                alt={'share ' + Nid + ' on Whatsapp'}
              />
            </a>
          </li>

          <li>
            <a
              className="mail-icon"
              href={`mailto:?Subject=${
                'Article on ' + Nid
              }&Body=Hey look i just found out this Amazing article on "${Nid}",Check it out : ${url}`}
              target="_top"
              rel="nofollow"
            >
              Share on
              <img
                style={{ width: '25px', marginLeft: '20px' }}
                className="share-image"
                src="https://www.svgrepo.com/show/303161/gmail-icon-logo.svg"
                alt={'share ' + Nid + ' on Gmail'}
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
  const { specialityId, topicId, id } = props.match.params;
  const [article, setArticle] = useState({});

  const Nid = id.replace(/-/g, ' ');

  let url;
  if (isClient) {
    url = window.location.href;
  }

  const getArticle = async (Nid) => {
    const res = await servicePost(
      `api/article/get`,
      {
        articleName: Nid,
      },
      {
        'Content-Type': 'application/json',
      }
    );
    return res.data.article;
  };

  useEffect(async () => {
    if (!props.specialities.speciality && id == 'before-starting') {
      getSpeciality(props.match.params.specialityId);
    } else {
      const article = await getArticle(Nid);
      setArticle(article);
    }
  }, []);

  const goToTop = () => {
    scrollTo(document.getElementById('nav'));
  };

  const html =
    id === 'before-starting'
      ? props.specialities?.speciality?.ArticleContent
      : article && article.ArticleContent;

  return (
    <>
      <div className="selected-article">
        <Seo
          title={`Before starting ${specialityId}`}
          description={specialityId}
          meta={[{ name: 'robots', content: 'index follow' }]}
        />
        <Row className="full-view-article p-2">
          <Col sm={2}>{/* Adds Here */}</Col>

          <Col id="top" style={{ padding: '0px' }} sm={8}>
            <div className="ql-snow">
              <div className="full-article ql-editor">
                {ReactHtmlParser(html)}
              </div>
            </div>
            <div className="top-icon">
              <ChevronsUp size="50" color="#dc143c" onClick={goToTop} />
            </div>
          </Col>

          <Col sm={2}>{/* Adds Here */}</Col>
        </Row>
      </div>
      <Link to={'/learn/' + specialityId} className="back-btn">
        <ChevronsLeft size="50" color="#dc143c" />
      </Link>
      <ShareArticle Nid={Nid} url={url} />
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  specialities: state.speciality,
});

export default connect(mapStateToProps, { getSpeciality })(Article);
