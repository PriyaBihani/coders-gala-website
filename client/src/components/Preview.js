import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Accordion, Row, Col } from 'react-bootstrap';

import { Footer } from '../layout';
import { Seo } from '../helpers';
import { ChevronsUp, Cross } from '../assets/icons';
import { getSpeciality, clearArticle, selectVideo } from '../actions';

import VideoPreview from '../sections/preview/VideoPreview';
import TopicsOverview from '../sections/preview/TopicsOverview';
import AdminButtons from '../layout/Buttons/AdminButtons';

const Preview = ({
	match,
	selectVideo,
	clearArticle,
	getSpeciality,
	speciality,
}) => {
	const [close, setClose] = useState(true);
	const { specialityName } = match.params

	useEffect(() => {
		clearArticle();
		getSpeciality(specialityName);
	}, [clearArticle, getSpeciality, specialityName]);
	useEffect(() => {
		selectVideo(speciality);
	}, [speciality, selectVideo]);

	return speciality ? (
		<div className='topics-ovr-cont'>
			<div
				className='overlay'
				style={{ display: close ? 'none' : 'block' }}
				onClick={() => setClose(!close)}></div>
			<Seo
				title='Select Article'
				meta={[{ name: 'robots', content: 'index follow' }]}
			/>
			<div className='speciality-container'>
				<div className='speciality-heading'>
					<h2>{speciality.name}</h2>
				</div>
				<Row>
					<Col
						className='topic-ovr-container'
						lg={4}
						style={{ height: close ? '25vh' : '50vh' }}>
						<div className='topics-overview'>
							<h3 style={{ fontSize: '1rem' }} className='overview'>
								<span>Topics Overview </span>
								<AdminButtons
									type='Add'
									url={`/${speciality.name}/topic/add/`}
									data={{ name: 'Topics' }}
								/>
							</h3>
							<div className='close-toggle'>
								{close ? (
									<span onClick={() => setClose(!close)}>
										<ChevronsUp />
									</span>
								) : (
									<span onClick={() => setClose(!close)}>
										<Cross />
									</span>
								)}
							</div>
						</div>
						<Accordion>
							<TopicsOverview specialityName={speciality.name} />
						</Accordion>
					</Col>
					<Col l={8}>
						<VideoPreview specialityName={speciality.name} />
					</Col>
				</Row>
			</div>
			<Footer />
		</div>
	) : null;
};

const mapStateToProps = (state) => ({
	speciality: state.speciality.speciality,
});

export default connect(mapStateToProps, {
	getSpeciality,
	clearArticle,
	selectVideo,
})(Preview);
