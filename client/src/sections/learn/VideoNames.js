import React from 'react';
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux';
import { Button } from '../../layout';
import { isClient } from '../../helpers';
import { deleteVideo, selectVideo } from '../../actions';
import AdminButtons from '../../layout/Buttons/AdminButtons';

const VideoNames = ({
	selectVideo,
	video,
	deleteVideo,
	topic,
	specialityName,
}) => {
	console.log(video);
	const handleDelete = (data) => {
		const { VideoName, _id } = data;
		const confirm =
			isClient &&
			window.prompt(`You sure want to delete "${VideoName}" ? Y or N `);
		if (confirm === 'Y') {
			deleteVideo(_id, topic._id, specialityName);
		}
	};

	return (
		<div className='row read-icon'>
			<div className='read col-10'>
				<div className='item'>
					<a
						type='button'
						onClick={() => {
							selectVideo(video);
						}}
						className='display-article'>
						<li className='article-name m-0'>
							{video.name}{' '}
							<span className='article-action-icons'>
								<AdminButtons
									type='Edit'
									url={`/video/update/${video._id}`}
									data={video}
								/>
								<AdminButtons
									type='Delete'
									handler={handleDelete}
									data={video}
								/>
								<Tooltip
									// options
									title={`Read "${video.name}"`}
									position='top'
									trigger='mouseenter'>
									<Button
										isButton={true}
										handler={() => {
											selectVideo(video);
										}}
									/>
								</Tooltip>
							</span>
						</li>
					</a>
				</div>
			</div>
			<div className='col-2'>
				<div className='update-delete float-right'></div>
			</div>
		</div>
	);
};

export default connect(null, { deleteVideo, selectVideo })(VideoNames);
