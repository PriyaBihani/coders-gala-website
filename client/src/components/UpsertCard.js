import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from '../layout';
import { serviceGet } from '../helpers';
import { addSpeciality, editSpeciality } from '../actions';
import Editor from '../sections/editor';

const UpsertCard = ({ addSpeciality, editSpeciality, edit, match }) => {
	const [state, setState] = useState({});
	const [data, setData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			if (edit) {
				const res = await serviceGet(
					`api/speciality/get/${match.params.specialityName}`
				);
				console.log(res);
				const { name, imageUrl, content, _id } = res.data.speciality;
				setData({ name, imageUrl, content, _id });
			}
		};
		fetchData();
	}, [edit, match.params.specialityName]);
	console.log(edit, data);

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.id]: e.target.value,
		});
	};

	const handleEditor = (html) => {
		setState({
			...state,
			content: html,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (edit) editSpeciality(state, data._id);
		else addSpeciality(state);
	};

	return (
		<div className='container mt-4'>
			<form className='mt-5'>
				<div className='form-group'>
					<input
						type='text'
						id='name'
						required
						placeholder='Speciality Name'
						className='form-control'
						defaultValue={edit ? data && data.name : ''}
						onChange={handleChange}
					/>
					<br />
					<input
						required
						type='text'
						id='imageUrl'
						onChange={handleChange}
						placeholder='Image URL'
						className='form-control'
						defaultValue={edit ? data && data.imageUrl : ''}
					/>
					<br />
					{!edit && (
						<>
							<input
								required
								type='text'
								id='alt'
								onChange={handleChange}
								placeholder='Image alt text'
								className='form-control'
							/>
							<br />
						</>
					)}

					<div className='ql-snow'>
						{edit ? (
							data && data.content ? (
								<Editor
									required
									defaultValue={data && data.content}
									className='ql-editor'
									handleEditor={handleEditor}
								/>
							) : null
						) : (
							<Editor
								required
								defaultValue=''
								className='ql-editor'
								handleEditor={handleEditor}
							/>
						)}
					</div>

					<div className='add-article-button'>
						<Button handler={handleSubmit} isButton={true} type='submit'>
							{edit ? 'Update' : 'Add'}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default connect(null, { addSpeciality, editSpeciality })(UpsertCard);
