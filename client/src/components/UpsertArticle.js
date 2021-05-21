import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Editor from '../sections/editor';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Button } from '../layout';

import { addArticle, editArticle, getArticle } from '../actions';
import { ChevronsUp } from '../assets/icons';

const UpsertArticle = (props) => {
	const { addArticle, specialities, editArticle, getArticle, prevArticle } =
		props;
	const [content, setcontent] = useState('');
	const [name, setname] = useState('');
	const [keywords, setArticleKeywords] = useState('');
	const [featured, setfeatured] = useState(false)
	const [thumbnailUrl, setthumbnailUrl] = useState('')
	// const [Loading, setLoading] = useState(false);
	// const topicId = "ERROR_NA_DIYO";
	function scrollTo(element) {
		window.scroll({
			behavior: 'smooth',
			left: 0,
			top: element.offsetTop,
		});
	}
	const goToTop = () => {
		scrollTo(document.getElementById('nav'));
	};

	console.log(props.match.params.articleId);

	useEffect(() => {
		if (props.edit) {
			getArticle(props.match.params.articleId);
		}
	}, [props, getArticle]);

	const handleEditor = (html) => {
		setcontent(html);
	};

	const handleEdit = async (e) => {
		e.preventDefault();
		console.log(name);
		console.log(keywords);
		const data = {
			name: name === '' ? prevArticle.name : name,
			keywords: keywords === '' ? prevArticle.keywords : keywords,
			content:
				content === '' ? prevArticle.content : content,
		};
		editArticle(data, prevArticle._id, specialities.speciality.Name);
		toast('Article updated successfully');
	};

	const handleAdd = async (e) => {
		e.preventDefault();
		// console.log({ content, name, keywords });
		addArticle(
			{ content, name, keywords, featured, thumbnailUrl }
		);
		toast('Article added successfully');
	};

	return (
		<Row className='full-view-article p-2'>
			<div className='share-icons'></div>

			<Col sm={1}></Col>

			<Col id='top' sm={10}>
				<div className=''>
					<div className=''>
						<h4 className='' id=''>
							{props.edit
								? `Update Article - ${prevArticle && prevArticle.name}`
								: 'Add a Article'}
						</h4>
					</div>

					<div className='content'>
						<form>
							<div className='form-group'>
								<input
									type='text'
									id='name'
									placeholder='Article Name'
									className='form-control'
									defaultValue={
										props.edit ? prevArticle && prevArticle.name : ''
									}
									onChange={(e) => {
										setname(e.target.value);
									}}
								/>
								<br />
								<input
									type='text'
									id='thumbnailUrl'
									placeholder='Article Thumbnail'
									className='form-control'
									defaultValue={
										props.edit ? prevArticle && prevArticle.thumbnailUrl : ''
									}
									onChange={(e) => {
										setthumbnailUrl(e.target.value);
									}}
								/>
								<br />

								<input
									type='text'
									id='keywords'
									placeholder='Article Description'
									className='form-control'
									defaultValue={
										props.edit ? prevArticle && prevArticle.keywords : ''
									}
									onChange={(e) => {
										setArticleKeywords(e.target.value);
									}}
								/>
								<br />
								<label htmlFor="featured">IsFeatured &nbsp;{" "}</label>
								<input
									defaultValue={
										props.edit ? prevArticle && prevArticle.featured : false
									}
									onChange={() => { setfeatured(!featured) }}
									type='checkbox'
									id='featured'

								/>

								<br />

								<>
									{props.edit ? (
										prevArticle && prevArticle.content ? (
											<Editor
												handleEditor={handleEditor}
												defaultValue={prevArticle && prevArticle.content}
											/>
										) : null
									) : (
										<Editor handleEditor={handleEditor} defaultValue='' />
									)}
								</>

								<div className='add-article-button'>
									<Button
										isButton={true}
										handler={(e) => {
											props.edit ? handleEdit(e) : handleAdd(e);
										}}>
										{props.edit ? 'Update' : 'Add'}
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className='top-icon'>
					<ChevronsUp size='50' color='#dc143c' onClick={goToTop} />
				</div>
			</Col>

			<Col sm={1}></Col>
		</Row>
	);
};

const mapStateToProps = (state) => ({
	specialities: state.speciality,
	prevArticle: state.article.selectedArticle,
});

export default connect(mapStateToProps, {
	addArticle,
	editArticle,
	getArticle,
})(UpsertArticle);
