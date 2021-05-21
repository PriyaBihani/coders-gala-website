import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import { Footer } from '../layout';

import { getSpeciality } from '../actions';
import { servicePost, scrollTo } from '../helpers';
import { ChevronsUp } from '../assets/icons';

// const ShareArticle = ({ Nid, url }, props) => {


// 	function actionToggle() {
// 		document.querySelector('.action').classList.toggle('active');
// 	}

// 	return (
// 		<>
// 			<div class='action' onClick={actionToggle}>
// 				<span>
// 					<img
// 						style={{ width: '25px' }}
// 						src='https://www.svgrepo.com/show/19199/share.svg'
// 						alt=''
// 					/>
// 				</span>
// 				<ul>
// 					<li>
// 						<a
// 							className='whatsapp-icon'
// 							rel='noopener noreferrer'
// 							href={`https://api.whatsapp.com/send?text=Hey look i just found out this Amazing article on "${Nid}",Check it out : ${url}`}
// 							target='_blank'>
// 							Share on
// 							<img
// 								style={{ width: '25px', marginLeft: '20px' }}
// 								src='https://www.svgrepo.com/show/303150/whatsapp-symbol-logo.svg'
// 								alt={'share ' + Nid + ' on Whatsapp'}
// 							/>
// 						</a>
// 					</li>

// 					<li>
// 						<a
// 							className='mail-icon'
// 							href={`mailto:?Subject=${'Article on ' + Nid
// 								}&Body=Hey look i just found out this Amazing article on "${Nid}",Check it out : ${url}`}
// 							target='_top'
// 							rel='nofollow'>
// 							Share on
// 							<img
// 								style={{ width: '25px', marginLeft: '20px' }}
// 								className='share-image'
// 								src='https://www.svgrepo.com/show/303161/gmail-icon-logo.svg'
// 								alt={'share ' + Nid + ' on Gmail'}
// 							/>
// 						</a>
// 					</li>
// 				</ul>
// 			</div>
// 		</>
// 	);
// };

const Article = (props) => {
	const { name } = props.match.params;
	const [article, setArticle] = useState({});




	const getArticle = async (name) => {
		const res = await servicePost(
			`api/article/get`,
			{
				name
			},
			{
				'Content-Type': 'application/json',
			}
		);
		return res.data.article;
	};

	const getArticleEffect = useCallback(
		async () => {
			const article = await getArticle(name.replace(/-/g, ' '));
			setArticle(article);
		},
		[name],
	)

	useEffect(() => {
		getArticleEffect()
	}, [getArticleEffect]);

	console.log(article)
	const goToTop = () => {
		scrollTo(document.getElementById('nav'));
	};


	const html = article && article.content;

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
	auth: state.auth
});

export default connect(mapStateToProps, { getSpeciality })(Article);


// import React from 'react'

// const Article = (props) => {
// 	const name = props.match.params.name
// 	console.log(name.replace(/-/g, ' '))
// 	return (
// 		<div>
// 			<div>
// 				lorem100
// 			</div>
// 		</div>
// 	);
// }

// export default Article;