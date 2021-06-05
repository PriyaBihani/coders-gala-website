import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllArticles } from '../actions/article';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Featured from '../sections/blog/Featured';
import All from '../sections/blog/All';
import Sidebar from '../sections/blog/Sidebar';

const Blog = ({ getAllArticles, articles, isAdmin, history }) => {
	useEffect(() => {
		if (articles.length === 0) {
			getAllArticles();
		}
		console.log(history);
	}, [articles, getAllArticles]);

	return (
		<div id='main-content' class='blog-page'>
			<div className='blog-header'>
				<h1 class='heading'>
					CodersGala <span class='underline--magical'>Blog</span>{' '}
				</h1>
			</div>
			<div className='container'>
				<div class='row'>
					<div class='col-lg-8 col-md-12 left-box'>
						<Featured articles={articles} />
					</div>
					<Sidebar history={history} articles={articles} />
				</div>
				<div className='row'>
					<All articles={articles} />
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	articles: state.article.articles,
	isAdmin: state.auth.isAdmin,
});

const loadData = (store) => {
	return store.dispatch(getAllArticles());
};

export default {
	component: connect(mapStateToProps, { getAllArticles })(Blog),
	loadData,
};
