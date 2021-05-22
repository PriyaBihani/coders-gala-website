import { serviceGet, servicePost } from '../helpers';
import { errorToast, successToast } from './toast';



export const getVideo = (id) => async (dispatch) => {
	try {
		const res = await serviceGet(`api/video/get/${id}`);
		successToast(res)
		dispatch({
			type: 'GET_VIDEO',
			payload: res.data,
		});
	} catch (error) {
		errorToast(error)
		dispatch({
			type: 'ADD_VIDEO_ERROR',
			payload: {},
		});
	}
};

export const addVideo = (data, id, specialityName) => async (dispatch) => {


	try {
		const res = await servicePost(`api/video/add/${id}`, data, {
			'Content-Type': 'application/json',
		});
		successToast(res)
		dispatch({
			type: 'ADD_VIDEO',
			payload: res.data,
		});

		const resTopic = await serviceGet(`api/topic/get/${specialityName}`);
		console.log(resTopic);

		dispatch({
			type: 'GET_TOPICS',
			payload: resTopic.data,
		});
	} catch (error) {

		errorToast(error)
		dispatch({
			type: 'ADD_VIDEO_ERROR',
			payload: {},
		});
	}
};

export const editVideo = (data, id, specialityName) => async (dispatch) => {
	try {
		const res = await servicePost(`api/video/update/${id}`, data, {
			'Content-Type': 'application/json',
		});
		console.log(res.data);
		dispatch({
			type: 'EDIT_VIDEO',
			payload: res.data,
		});
		successToast(res)

		const resTopic = await serviceGet(`api/topic/get/${specialityName}`);

		console.log(resTopic.data);

		dispatch({
			type: 'GET_TOPICS',
			payload: resTopic.data,
		});
	} catch (error) {
		errorToast(error)
		dispatch({
			type: 'EDIT_VIDEO_ERROR',
			payload: {},
		});
	}
};

export const deleteVideo =
	(videoId, topicId, specialityName) => async (dispatch) => {
		try {
			const res = await servicePost(
				`api/video/delete/${videoId}/${topicId}`,
				{},
				{
					'Content-Type': 'application/json',
				}
			);
			console.log(res.data);
			dispatch({
				type: 'DELETE_VIDEO',
				payload: res.data,
			});
			const res2 = await serviceGet(`api/topic/get/${specialityName}`);
			console.log(res2.data);
			successToast(res)
			dispatch({
				type: 'GET_TOPICS',
				payload: res2.data,
			});
		} catch (error) {
			errorToast(error)
			dispatch({
				type: 'DELETE_VIDEO_ERROR',
				payload: {},
			});
		}
	};

export const selectVideo = (video) => (dispatch) => {
	try {
		dispatch({
			type: 'SELECT_VIDEO',
			payload: video,
		});
	} catch (error) {
		dispatch({
			type: 'SELECT_VIDEO_ERROR',
		});
	}
};
