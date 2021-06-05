import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Button } from '../layout';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { addVideo, editVideo, getVideo, getArticleOptions } from '../actions';
const animatedComponents = makeAnimated();

const UpsertVideo = ({
	edit,
	match,
	addVideo,
	editVideo,
	getVideo,
	getArticleOptions,
	specialities,
	prevVideo,
	articleOptions
}) => {
	const [name, setName] = useState(prevVideo ? prevVideo.name : '');
	const [description, setDescription] = useState(
		prevVideo ? prevVideo.description : ''
	);
	const [url, setUrl] = useState(prevVideo ? prevVideo.url : '');
	const [defaultOptions, setdefaultOptions] = useState(null)
	const [options, setOptions] = useState([])
	const [selectedOptions, setselectedOptions] = useState([])


	useEffect(() => {
		getArticleOptions()
	}, [])

	useEffect(() => {
		optionsEffect()
	}, [articleOptions])


	const optionsEffect = useCallback(
		() => {
			if (edit) {
				let tempDefaults = [{}]

				articleOptions.forEach(option => {
					if (prevVideo.articlesLinked.includes(option.value)) {
						tempDefaults.push(option)
					} else {
					}
				})
				setOptions(articleOptions)
				setdefaultOptions(tempDefaults)
			} else {
				setOptions(articleOptions)
			}
		},
		[articleOptions],
	)



	const handleAdd = async (e) => {
		e.preventDefault();
		let articlesLinked = []
		selectedOptions.forEach(option => {
			articlesLinked.push(option._id)
		})
		await addVideo(
			{ name, description, url, articlesLinked },
			match.params.topicId,
			specialities.speciality.name
		);
	};

	const handleEdit = async (e) => {
		e.preventDefault();
		let articlesLinked = []
		selectedOptions.forEach(option => {
			articlesLinked.push(option.value)
		})
		console.log({ articlesLinked })
		await editVideo(
			{ name, description, url, articlesLinked },
			prevVideo._id,
			specialities.speciality.name
		);
	};


	console.log({ options, defaultOptions })

	const handleOptions = (options) => {
		setselectedOptions(options)
	}


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
						<label>Linked Article</label>
						{
							edit ? (defaultOptions && <Select
								closeMenuOnSelect={false}
								components={animatedComponents}
								defaultValue={defaultOptions}
								onChange={handleOptions}
								isMulti
								options={options}
							/>) : (<Select
								closeMenuOnSelect={false}
								components={animatedComponents}
								defaultValue={[]}
								onChange={handleOptions}
								isMulti
								options={options}
							/>)
						}
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
	articleOptions: state.article.options
});

export default connect(mapStateToProps, {
	addVideo,
	editVideo,
	getVideo,
	getArticleOptions
})(UpsertVideo);
