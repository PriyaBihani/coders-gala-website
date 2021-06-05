import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ArticlePreview from './ArticlePreview';

const VideoPreview = ({ video }) => {
	console.log(video);
	return video && !video.content ? (
		<div className='video-container'>
			<div className='video'>
				<iframe
					className='iframe'
					src={video.url}
					title='YouTube video player'
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen></iframe>
			</div>
			<div className='info'>
				<h3 className='title'>{video.name}</h3>
				<div className='desc'>{video.description}</div>
				<div className='linked-articles'>
					<h4>Articles Related to the topic</h4>
					<div className="row">
						{
							video.articlesLinked.map(article => {
								return (
									<div className="col">
										<Link
											to={`/blog/read/${article.name.replace(/\s/g, '-')}`}
											className='btn btn-outline-secondary'>
											{article.name}
										</Link>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		</div>
	) : (
		<ArticlePreview SelectedArticle={video} />
	);
};

const mapStateToProps = (state) => ({
	video: state.video.selectedVideo,
});

export default connect(mapStateToProps, null)(VideoPreview);
