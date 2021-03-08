import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Accordion, Row, Col, Button } from "react-bootstrap";

import { Footer } from "../layout";
import { Seo } from "../helpers";
import { getSpeciality, clearArticle } from "../actions";

<<<<<<< HEAD
import { Seo, scrollTo } from '../helpers';
import {
  getSpeciality,
  getTopics,
  deleteTopic,
  clearArticle,
  setOpenTopics,
} from '../actions';

import Footer from '../layout/Footer/Footer';

import AddTopicName from '../sections/preview/AddTopic';
import EditTopicModal from '../sections/preview/EditTopicModal';
import AdminButtons from '../layout/Buttons/AdminButtons';

const ActionButtons = ({ handleDelete, topic, setOpenTopics }) => {
  return (
    <div className="action-buttons">
      <AdminButtons
        type="Edit"
        dataTarget={`#${topic.Name.split(' ')[0]}`}
        data={topic}
      />
      <AdminButtons type="Delete" handler={handleDelete} data={topic} />
      <AdminButtons type="Add" data={topic} url={`/article/add/${topic._id}`} />

      <Accordion.Toggle
        as={Button}
        variant="link"
        className="float-right arrow-down"
        eventKey={topic.Name.split(/\s/).join('')} // to remove spaces
        onClick={() => {
          setOpenTopics(topic._id);
          document
            .querySelector(`.fa-angle-down#${topic.Name.split(/\s/).join('')}`)
            .classList.toggle('rotate');
        }}
      >
        <svg
          id={topic.Name.split(/\s/).join('')}
          viewBox="0 0 32 32"
          className=" icon icon-chevron-bottom article-dwn article-toggle fa-angle-down"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M16.003 18.626l7.081-7.081L25 13.46l-8.997 8.998-9.003-9 1.917-1.916z" />
        </svg>
      </Accordion.Toggle>
    </div>
  );
};
=======
import ArticlePreview from "../sections/preview/ArticlePreview";
import TopicsOverview from "../sections/preview/TopicsOverview";
import { Add } from "../assets/icons";
>>>>>>> staging

const Preview = ({
  match,
  clearArticle,
  getSpeciality,
  speciality,
  isAdmin,
}) => {
  const [previewArticle, setPreviewArticle] = useState(speciality);

  const requiredSpeciality = match.params.specialityName;

  useEffect(async () => {
    clearArticle();
    getSpeciality(requiredSpeciality);
  }, []);

  useEffect(() => {
    setPreviewArticle(speciality);
  }, [speciality]);

  return (
    <div className="topics-ovr-cont">
      <Seo
        title="Select Article"
        meta={[{ name: "robots", content: "index follow" }]}
      />

      <div className="speciality-container">
        <div className="speciality-heading">
          <h2>{requiredSpeciality}</h2>
        </div>

        <Row>
          <Col className="topic-ovr-container" lg={4}>
            <Accordion defaultActiveKey={window.innerWidth <= 500 ? "1" : "0"}>
              <div className="topics-overview">
                <h3 style={{ fontSize: "1rem" }} className="overview">
                  {/* Use content method of CSS */}
                  <span>
                    {window.innerWidth <= 500
                      ? " In this Module..."
                      : "Topics Overview"}{" "}
                  </span>

                  {isAdmin ? (
                    <Link to={`/${requiredSpeciality}/topic/add/`}>
                      <Add />{" "}
                    </Link>
                  ) : null}
                </h3>

                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  onClick={() => {
                    document
                      .querySelector(".arrow-down.overview")
                      .classList.toggle("down");
                    document
                      .querySelector(".arrow-down svg.topics-overview-toggle")
                      .classList.remove("anim");
                  }}
                  className="float-right speciality-dropdown overview arrow-down"
                  eventKey="0"
                >
                  <svg
                    viewBox="0 0 32 32"
                    className="anim icon icon-chevron-bottom article-dwn topics-overview-toggle fa-angle-down"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M16.003 18.626l7.081-7.081L25 13.46l-8.997 8.998-9.003-9 1.917-1.916z" />
                  </svg>
                </Accordion.Toggle>
              </div>
              <Accordion.Collapse eventKey="0">
                <Accordion>
                  <TopicsOverview
                    specialityName={requiredSpeciality}
                    setPreviewArticle={setPreviewArticle}
                  />
                </Accordion>
              </Accordion.Collapse>
            </Accordion>
          </Col>

          <Col l={8}>
            <ArticlePreview
              SelectedArticle={previewArticle && previewArticle}
              specialityName={requiredSpeciality}
            />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  speciality: state.speciality.speciality,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, {
  getSpeciality,
  clearArticle,
})(Preview);
