import React from 'react';
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux';
import { scrollTo } from '../../helpers';
import { Button } from '../../layout';
import { deleteArticle, selectVideo } from '../../actions';
import AdminButtons from '../../layout/Buttons/AdminButtons';

const ArticleNames = ({
	selectVideo,
	article,
	deleteArticle,
	topic,
	specialityName,
}) => {
	const handleDelete = (data) => {
		const { ArticleName, _id } = data;
		const confirm = window.prompt(
			`You sure want to delete "${ArticleName}" ? Y or N `
		);
		if (confirm === 'Y') {
			deleteArticle(_id, topic._id, specialityName);
		}
	};

	return (
		<div className='row read-icon'>
			<div className=' read col-10'>
				<div className='item'>
					<a
						type='button'
						onClick={() => {
							console.log(article);
							selectVideo(article);
							const pos = document.querySelector('.card-container');
							if (window.innerWidth <= 500) {
								scrollTo(pos);
							}
						}}
						className='display-article'>
						<li className='article-name m-0'>
							{article.ArticleName}{' '}
							<span className='article-action-icons'>
								<AdminButtons
									type='Edit'
									url={`/article/update/${article._id}`}
									data={article}
								/>
								<AdminButtons
									type='Delete'
									handler={handleDelete}
									data={article}
								/>
								<Tooltip
									// options
									title={`Read "${article.ArticleName}"`}
									position='top'
									trigger='mouseenter'>
									<Button
										isButton={true}
										handler={() => {
											selectVideo(article);
											const pos = document.querySelector('.card-container');
											if (window.innerWidth <= 500) {
												scrollTo(pos);
											}
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

export default connect(null, { deleteArticle, selectVideo })(ArticleNames);
