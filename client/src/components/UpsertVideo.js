import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from '../layout';
import { addVideo, editVideo, getVideo } from '../actions';

const UpsertVideo = ({
	edit,
	match,
	addVideo,
	editVideo,
	getVideo,
	specialities,
	prevVideo,
}) => {
	console.log(prevVideo);
	const [name, setName] = useState(prevVideo ? prevVideo.name : '');
	const [description, setDescription] = useState(
		prevVideo ? prevVideo.description : ''
	);
	const [url, setUrl] = useState(prevVideo ? prevVideo.url : '');

	const handleAdd = async (e) => {
		e.preventDefault();
		await addVideo(
			{ name, description, url },
			match.params.topicId,
			specialities.speciality.Name
		);
		toast('Video added Successfully');
	};

	const handleEdit = async (e) => {
		e.preventDefault();
		await editVideo(
			{ name, description, url },
			prevVideo._id,
			specialities.speciality.Name
		);
		toast('Video edited Successfully');
	};

	return (
		<div className='upsert-container'>
			<div className='upsert-video-form'>
				<h3>{edit ? 'Update' : 'Add '}Video</h3>
				<form>
					<div className='form-group'>
						<label>Name</label>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label>Url</label>
						<input
							type='text'
							value={url}
							onChange={(e) => setUrl(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label>Description</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</form>
				<Button
					isButton={true}
					handler={(e) => {
						edit ? handleEdit(e) : handleAdd(e);
					}}>
					{edit ? 'Update' : 'Add'}
				</Button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	specialities: state.speciality,
	prevVideo: state.video.selectedVideo,
});

export default connect(mapStateToProps, {
	addVideo,
	editVideo,
	getVideo,
})(UpsertVideo);
