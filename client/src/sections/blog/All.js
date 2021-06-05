import React from 'react';
import { formatDate } from '../../helpers';
import { Link } from 'react-router-dom';
import Like from '../article/Like';

const All = ({ articles }) => {
	return (
		<>
			{articles &&
				articles.map((article) => {
					if (!article.featured) {
						return (
							<div className='col-lg-4 col-md-6 mt-4 pt-2'>
								<div className='blog-post rounded border'>
									<div className='blog-img d-block overflow-hidden position-relative'>
										<img
											style={{ width: '350px', height: '250px' }}
											src={article.thumbnailUrl}
											className='img-fluid rounded-top'
											alt=''
										/>
										<div className='overlay rounded-top bg-dark'></div>
										<div className='post-meta'>
											<Like articleId={article._id} />

											<Link
												to={`/blog/read/${article.name.replace(/\s/g, '-')}`}
												className='text-light read-more'>
												Read More... <i className='mdi mdi-chevron-right'></i>
											</Link>
										</div>
									</div>
									<div style={{ background: '#fff' }} className='content p-3'>
										<small className='text-muted p float-right'>
											{formatDate(article.createdAt)}
										</small>
										<small>
											<a href='javascript:void(0)' className='text-primary'>
												Software
											</a>
										</small>
										<h4 className='mt-2'>
											<Link
												to={`/blog/read/${article.name.replace(/\s/g, '-')}`}
												className='text-dark title'>
												{article.name}
											</Link>
										</h4>
										<p className='text-muted mt-2'>
											There is now an abundance of readable dummy texts. These
											are usually used when a text is required purely to fill a
											space.
										</p>
									</div>
								</div>
							</div>
						);
					}
				})}
		</>
	);
};

export default All;
