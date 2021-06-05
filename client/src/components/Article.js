import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import { Footer } from '../layout';

import { getAllArticles, getArticle } from '../actions/article';
import { scrollTo } from '../helpers';
import { ChevronsUp } from '../assets/icons';

const Article = (props) => {
	const { getArticle, article } = props
	const { name } = props.match.params;



	useEffect(() => {
		getArticle(name.replace(/-/g, ' '))
	}, []);


	const goToTop = () => {
		scrollTo(document.getElementById('nav'));
	};


	const html = article && article.content;
	console.log(html)

	return (
		<>
			<div className='selected-article'>

				<Row className='full-view-article p-2'>
					<Col sm={2}>{/* Adds Here */}</Col>

					<Col id='top' style={{ padding: '0px' }} sm={8}>
						<div className='ql-snow'>
							<div className='full-article ql-editor'>
								{ReactHtmlParser(html)}
							</div>
						</div>
						<div className='top-icon'>
							<ChevronsUp size='50' color='#dc143c' onClick={goToTop} />
						</div>
					</Col>

					<Col sm={2}>{/* Adds Here */}</Col>
				</Row>
			</div>

			<Footer />
		</>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	article: state.article.selectedArticle
});

const loadData = (store, params) => {
	const { name } = params

	return store.dispatch(getArticle(name && name.replace(/-/g, ' ')));
};


export default {
	component: connect(mapStateToProps, { getArticle })(Article),
	loadData,
};


