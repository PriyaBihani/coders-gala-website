import React from 'react';
import { connect } from 'react-redux';

const VideoPreview = ({ video }) => {
	return (
		<div className='video-container'>
			<div className='video'>
				<iframe
					className='iframe'
					src='https://www.youtube.com/embed/0Kl1ucZuSZ8'
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
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	video: state.video.selectedVideo,
});

export default connect(mapStateToProps, null)(VideoPreview);
