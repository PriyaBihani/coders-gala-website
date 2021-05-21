import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from '../../layout';
import AdminButtons from '../../layout/Buttons/AdminButtons';
import { getSpecialities, deleteSpeciality } from '../../actions';

const Card = ({ getSpecialities, specialities, deleteSpeciality }) => {
	useEffect(() => {

		if (specialities.length === 0) {
			getSpecialities();
		}
	}, [specialities.length, getSpecialities]);

	const handleDelete = (item) => {
		// Got to helper, check
		const confirm = window.prompt(
			`You sure want to delete "${item.Name}" ? Y or N (Deleting a speciality will lead to deletion of all topics and articles inside it) `
		);
		if (confirm === 'Y') {
			deleteSpeciality(item._id);
		}
	};

	return (
		<div className='learn-container'>
			<div className='container pt-4'>
				<div className='row'>
					{specialities &&
						specialities.map((item) => {
							return (
								<div key={item._id} className='col-lg-6'>
									<div className='card'>
										<div className='imgBx'>
											<img
												className='image'
												src={item.imageUrl}
												alt={item.alt}
											/>
										</div>
										<div
											style={{
												height: window.innerWidth <= 600 ? '150px' : 'auto',
											}}
											className='contentBx'>
											<h2> {item.name}</h2>
											<AdminButtons
												type='Edit'
												url={'/updatespeciality/' + item.name}
												data={item}
											/>
											<AdminButtons
												type='Delete'
												handler={() => {
													handleDelete(item);
												}}
												data={item}
											/>
											<Button url={'/learn/' + item.name}>Start Now</Button>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	specialities: state.speciality.specialities,
});

export default connect(mapStateToProps, {
	getSpecialities,
	deleteSpeciality,
})(Card);
