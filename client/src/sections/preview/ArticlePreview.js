import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

const ArticlePreview = ({ SelectedArticle, specialityName }) => {
  const ReadMoreUrl =
    SelectedArticle && SelectedArticle.ArticleName
      ? `/${specialityName}/read/${SelectedArticle.ArticleName.replace(
          /\s/g,
          '-'
        )}`
      : `/${specialityName}/read/before-starting`;
  return (
    <div className="card-container">
      <div className="card">
        <div>
          <div>
            <h1 className="material-icons card-header">
              {SelectedArticle && SelectedArticle.ArticleName
                ? SelectedArticle.ArticleName
                : 'Read This Before You Start...'}
              <div>
                <h3 className="float-right"></h3>
              </div>
            </h1>
            <hr />
            <div className="ql-snow">
              <div className="card-no-body ql-editor">
                {ReactHtmlParser(
                  SelectedArticle && SelectedArticle.ArticleContent
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Link
            onClick={() => {
              window.scroll({
                behavior: 'smooth',
                left: 0,
                top: '0px',
              });
            }}
            to={ReadMoreUrl}
          >
            <h2 className="link">Read More.....</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
