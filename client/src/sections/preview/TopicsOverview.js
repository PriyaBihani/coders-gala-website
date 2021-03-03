import { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Accordion, Button } from 'react-bootstrap';
import { getTopics, deleteTopic } from '../../actions';
import ArticleNames from '../learn/ArticleNames';
import AdminButtons from '../../layout/Buttons/AdminButtons';

const TopicsOverview = ({
  getTopics,
  specialityName,
  topics,
  setPreviewArticle,
}) => {
  useEffect(async () => {
    getTopics(specialityName);
  }, []);

  const handleDelete = (topic) => {
    const confirm = window.prompt(
      `You sure want to delete "${topic.Name}" ? Y or N (Deleting a topic will lead to deletion of all articles inside it) `
    );
    if (confirm === 'Y') {
      deleteTopic(topic._id, specialityName);
      toast('Deleted speciality sucessfully');
    }
  };

  return (
    <div id="specialities" className="Topic-names ">
      {topics.length > 0 &&
        topics.map((topic) => (
          <div key={topic._id}>
            <br />
            <div className="p-0 speciality-topic-container m-1" key={topic._id}>
              {/* When user clicked on the locked topic box referral article shows*/}
              <h4 className="float-left topicName">{topic.Name}</h4>
              {/* <EditTopicModal
                specialityName={specialityName}
                name={topic.Name}
                Locked={topic.locked}
                id={topic._id}
                modalId={topic.Name.split(' ')[0]}
              /> */}

              {/* <Accordion
                defaultActiveKey={
                  props.openTopics.includes(topic._id)
                    ? topic.Name.split(/\s/).join('')
                    : ''
                }
              > */}
              <Accordion defaultActiveKey={topic.Name.split(/\s/).join('')}>
                {/* <ActionButtons
                  topic={topic}
                  handleDelete={handleDelete}
                  setOpenTopics={props.setOpenTopics}
                /> */}
                <ActionButtons topic={topic} handleDelete={handleDelete} />

                <hr />
                <Accordion.Collapse eventKey={topic.Name.split(/\s/).join('')}>
                  <ol>
                    {topic.articles &&
                      topic.articles.map((article) => {
                        return (
                          <ArticleNames
                            topic={topic}
                            article={article}
                            setPreviewArticle={setPreviewArticle}
                            specialityName={specialityName}
                          />
                        );
                      })}
                  </ol>
                </Accordion.Collapse>
              </Accordion>
            </div>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  topics: state.topic.topics,
});

export default connect(mapStateToProps, { getTopics, deleteTopic })(
  TopicsOverview
);

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
          {
            /* setOpenTopics(topic._id); */
          }
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
        >
          <path d="M16.003 18.626l7.081-7.081L25 13.46l-8.997 8.998-9.003-9 1.917-1.916z" />
        </svg>
      </Accordion.Toggle>
    </div>
  );
};
