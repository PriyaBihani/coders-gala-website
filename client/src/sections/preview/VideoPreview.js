import React from 'react';

const VideoPreview = () => {
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
				<h3 className='title'>Title of the video</h3>
				<div className='desc'>
					Description Of The Video Lorem ipsum, dolor sit amet consectetur
					adipisicing elit. Labore, quae ipsum doloribus quam commodi nesciunt.
					Iusto neque ipsa magnam saepe? Lorem ipsum dolor sit amet consectetur,
					adipisicing elit. Voluptates, cupiditate?lore10 Lorem ipsum dolor sit
					amet consectetur adipisicing elit. Mollitia, debitis.
				</div>
				<div className='linked-articles'>
					<h4>Articles Related to the topic</h4>
				</div>
			</div>
		</div>
	);
};

export default VideoPreview;
