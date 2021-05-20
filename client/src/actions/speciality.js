import { serviceGet, servicePost } from '../helpers';

export const getSpecialities = () => async (dispatch) => {
	try {
		const res = await serviceGet('api/speciality/all');
		console.log(res);
		dispatch({
			type: 'GET_SPECIALITIES',
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: 'GET_SPECIALITIES_ERROR',
			payload: {},
		});
	}
};

export const clearSpeciality = () => async (dispatch) => {
	dispatch({
		type: 'CLEAR_SPECIALITY',
		payload: {},
	});
};

export const getSpeciality = (specialityName) => async (dispatch) => {
	try {
		const res = await serviceGet(`api/speciality/get/${specialityName}`);
		dispatch({
			type: 'GET_SPECIALITY',
			payload: res.data.speciality,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'GET_SPECIALITY_ERROR',
			payload: {},
		});
	}
};

export const addSpeciality = (data) => async (dispatch) => {
	try {
		console.log(data);
		const res = await servicePost('api/speciality/add', data, {
			'Content-Type': 'application/json',
		});
		console.log(res.data);
		dispatch({
			type: 'ADD_SPECIALITIY',
			payload: res.data,
		});
		const res2 = await serviceGet('api/speciality/all');
		dispatch({
			type: 'GET_SPECIALITIES',
			payload: res2.data,
		});
	} catch (error) {
		dispatch({
			type: 'ADD_SPECIALITY_ERROR',
			payload: {},
		});
	}
};

export const editSpeciality = (data, id) => async (dispatch) => {
	try {
		const res = await servicePost(`api/speciality/update/${id}`, data, {
			'Content-Type': 'application/json',
		});
		dispatch({
			type: 'EDIT_SPECIALITIY',
			payload: res.data,
		});
		const res2 = await serviceGet('api/speciality/all');
		dispatch({
			type: 'GET_SPECIALITIES',
			payload: res2.data,
		});
	} catch (error) {
		dispatch({
			type: 'EDIT_SPECIALITY_ERROR',
			payload: {},
		});
	}
};

export const deleteSpeciality = (id) => async (dispatch) => {
	try {
		const res = await servicePost(
			`api/speciality/delete/${id}`,
			{},
			{
				'Content-Type': 'application/json',
			}
		);
		dispatch({
			type: 'DELETE_SPECIALITIY',
			payload: res.data,
		});
		const res2 = await serviceGet('api/speciality/all');
		dispatch({
			type: 'GET_SPECIALITIES',
			payload: res2.data,
		});
	} catch (error) {
		dispatch({
			type: 'DELETE_SPECIALITY_ERROR',
			payload: {},
		});
	}
};
