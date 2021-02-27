import React, { useState, useEffect } from 'react';
import { Accordion, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tippy';
import { toast } from 'react-toastify';

import Article from '../sections/learn/Article';
import SpecialityPreviewArticle from '../sections/preview/SpecialityPreviewArticle';
import PreviewArticle from '../sections/preview/PreviewArticle';

import { Seo } from '../helpers';
import {
  getSpeciality,
  getTopics,
  deleteTopic,
  clearArticle,
  setOpenTopics,
} from '../actions';
// import DisplayTopicNames from "../TopicNames/DisplayTopicNames";

import Footer from '../layout/Footer/Footer';
// import ShareIcon from "./shareIcon";
// import Preloader from "../../Preloader/preloader";

import { serviceGet, servicePost } from '../helpers';
import AddTopicName from '../sections/learn/AddTopic';
import EditTopicModal from '../sections/learn/EditTopicModal';
import { AdminButtons } from '../layout';

const ActionButtons = ({ handleDelete, topic, setOpenTopics }) => {
  return (
    <div className="action-buttons">
      <AdminButtons
        type="Edit"
        dataTarget={`#${topic.Name.split(' ')[0]}`}
        data={topic}
      />
      <AdminButtons type="Delete" handler={handleDelete} data={topic} />
      <AdminButtons
        type="Add"
        data={topic}
        link={`/article/add/${topic._id}`}
      />

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

const Preview = (props) => {
  const [topics, setTopics] = useState({});
  const [selected, setSelected] = useState(false);
  const [SelectedArticle, setSelectedArticle] = useState();
  const [showReferralArticle, setshowReferralArticle] = useState(false);
  const [referralTopicId, setreferralTopicId] = useState('');
  const { user } = props;

  const isAdmin = user && user.isAdmin;

  const requiredSpeciality = props.match.params.specialityName;

  useEffect(async () => {
    props.clearArticle();

    props.getSpeciality(requiredSpeciality);

    props.getTopics(requiredSpeciality);
  }, []);

  function scrollTo(element) {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: '0px',
    });
  }

  const readArticle = (article) => {
    displayArticle(article);
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 569) {
        scrollTo();
      }
    }
  };

  const displayArticle = (article) => {
    setSelectedArticle(article);
    setSelected(true);
  };

  const handleDelete = (topic) => {
    const confirm = window.prompt(
      `You sure want to delete "${topic.Name}" ? Y or N (Deleting a topic will lead to deletion of all articles inside it) `
    );
    if (confirm === 'Y') {
      props.deleteTopic(topic._id, requiredSpeciality);
      toast('Deleted speciality sucessfully');
    }
  };

  return (
    <div className="topics-ovr-cont">
      <Seo meta={[{ name: 'robots', content: 'index follow' }]} />

      <div className="speciality-container">
        <div className="speciality-heading">
          <h2>{requiredSpeciality}</h2>
        </div>

        <Row>
          <Col className="topic-ovr-container" lg={4}>
            {/* Yeh pehla accordian deekhta kyun nahi h desktop mode mein */}
            {/* {Kyuki mobile view mein vo collapse ho jata hai aur desktop mein nahi :) } */}
            <Accordion defaultActiveKey={window.innerWidth <= 500 ? '1' : '0'}>
              <div className="topics-overview">
                <h3 style={{ fontSize: '1rem' }} className="overview">
                  <span>
                    {window.innerWidth <= 500
                      ? ' In this Module...'
                      : 'Topics Overview'}{' '}
                  </span>

                  {isAdmin ? (
                    <AddTopicName
                      specialityName={requiredSpeciality}
                      speciality={props.specialities.speciality}
                    />
                  ) : null}
                </h3>

                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  onClick={() => {
                    document
                      .querySelector('.arrow-down.overview')
                      .classList.toggle('down');
                    document
                      .querySelector('.arrow-down svg.topics-overview-toggle')
                      .classList.remove('anim');
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
              <br />
              <Accordion.Collapse eventKey="0">
                <div id="specialities" className="Topic-names ">
                  {props.topics.topics.length > 0 &&
                    props.topics.topics.map((topic) => {
                      return (
                        <div key={topic._id}>
                          <br />
                          <div
                            className="p-0 speciality-topic-container m-1"
                            key={topic._id}
                          >
                            {/* When user clicked on the locked topic box referral article shows*/}
                            <h4 className="float-left topicName">
                              {topic.Name}
                            </h4>
                            <EditTopicModal
                              specialityName={requiredSpeciality}
                              name={topic.Name}
                              Locked={topic.locked}
                              id={topic._id}
                              modalId={topic.Name.split(' ')[0]}
                            />

                            <Accordion
                              defaultActiveKey={
                                props.openTopics.includes(topic._id)
                                  ? topic.Name.split(/\s/).join('')
                                  : ''
                              }
                            >
                              <ActionButtons
                                topic={topic}
                                handleDelete={handleDelete}
                                setOpenTopics={props.setOpenTopics}
                              />

                              <hr />
                              <Accordion.Collapse
                                eventKey={topic.Name.split(/\s/).join('')}
                              >
                                <ol>
                                  {topic.articles &&
                                    topic.articles.map((article) => {
                                      return (
                                        <Article
                                          specialities={props.specialities}
                                          isAdmin={isAdmin}
                                          topic={topic}
                                          readArticle={readArticle}
                                          displayMode={'light'}
                                          article={article}
                                        />
                                      );
                                    })}
                                </ol>
                              </Accordion.Collapse>
                            </Accordion>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Accordion.Collapse>
            </Accordion>
          </Col>

          <Col l={8}>
            <div className="card-container ">
              {selected ? (
                <PreviewArticle
                  specialityName={requiredSpeciality}
                  SelectedArticle={SelectedArticle}
                />
              ) : (
                <SpecialityPreviewArticle
                  item={props.specialities.speciality}
                  requiredSpeciality={requiredSpeciality}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  specialities: state.speciality,
  topics: state.topic,
  openTopics: state.ui.openTopics,
  user: state.auth,
});

export default connect(mapStateToProps, {
  getSpeciality,
  getTopics,
  clearArticle,
  setOpenTopics,
  deleteTopic,
})(Preview);
