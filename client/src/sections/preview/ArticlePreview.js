import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { unlockTopic } from '../../actions/topic';

const ArticlePreview = ({ SelectedArticle, specialityName, unlockTopic }) => {
	const ReadMoreUrl =
		SelectedArticle && SelectedArticle.ArticleName
			? `/${specialityName}/read/${SelectedArticle.ArticleName.replace(
					/\s/g,
					'-'
			  )}`
			: `/${specialityName}/read/before-starting`;

	const handleUnlock = async (topicId, specialityName) => {
		const res = await unlockTopic(topicId, specialityName);
		console.log(res);
	};
	return (
		<div className='card-container'>
			<div className='card'>
				<div>
					<h1 className='material-icons card-header'>
						{SelectedArticle && SelectedArticle.ArticleName
							? SelectedArticle.ArticleName
							: 'Read This Before You Start...'}
						{/* <div>
							<h3 className='float-right'></h3>
						</div> */}
					</h1>
					<hr />
					<div className='ql-snow'>
						<div className='card-no-body ql-editor'>
							{SelectedArticle && SelectedArticle.locked ? (
								<div>
									To view this article please unlock it using points{' '}
									<button
										onClick={() => {
											handleUnlock(
												SelectedArticle && SelectedArticle.topicId,
												specialityName
											);
										}}>
										Unlock
									</button>{' '}
								</div>
							) : (
								ReactHtmlParser(
									SelectedArticle && SelectedArticle.ArticleContent
								)
							)}
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
						to={ReadMoreUrl}>
						<h2 className='link'>
							{SelectedArticle && SelectedArticle.locked
								? 'Unlock'
								: 'Read More.....'}
						</h2>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { unlockTopic })(ArticlePreview);
