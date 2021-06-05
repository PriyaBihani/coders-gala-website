import React from 'react';
import { Link } from 'react-router-dom';
import Like from '../article/Like';

const Featured = ({ articles }) => {
	return (
		<div>
			{articles &&
				articles.map((article) => {
					if (article && article.featured === true) {
						console.log(article);
						return (
							<div className='card single_post'>
								<div className='body'>
									<div className='img-post'>
										<img
											style={{ width: '800px', height: '280px' }}
											className='d-block img-fluid'
											src={article.thumbnailUrl}
											alt=''
										/>
									</div>
									<h3>
										<a href='blog-details.html'>{article.name}</a>
									</h3>
									<p>
										It is a long established fact that a reader will be
										distracted by the readable content of a page when looking at
										its layout. The point of using Lorem Ipsum is that it has a
										more-or-less normal
									</p>
								</div>
								<div className='footer'>
									<div className='actions'>
										<Link
											to={`/blog/read/${article.name.replace(/\s/g, '-')}`}
											className='btn btn-outline-secondary'>
											Continue Reading
										</Link>
									</div>
									<ul className='stats'>
										<li>
											<Like articleId={article._id} />
										</li>
									</ul>
								</div>
							</div>
						);
					}
					return null;
				})}
		</div>
	);
};

export default Featured;
