import { serviceGet, servicePost } from '../helpers';

export const getVideo = (id) => async (dispatch) => {
	try {
		const res = await serviceGet(`api/video/get/${id}`);
		console.log(res.data);
		dispatch({
			type: 'GET_VIDEO',
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: 'ADD_VIDEO_ERROR',
			payload: {},
		});
	}
};

export const addVideo = (data, id, specialityName) => async (dispatch) => {
	try {
		const resVideo = await servicePost(`api/video/add/${id}`, data, {
			'Content-Type': 'application/json',
		});
		console.log(resVideo.data);
		dispatch({
			type: 'ADD_VIDEO',
			payload: resVideo.data,
		});

		const resTopic = await serviceGet(`api/topic/get/${specialityName}`);
		console.log(resTopic);

		dispatch({
			type: 'GET_TOPICS',
			payload: resTopic.data,
		});
	} catch (error) {
		dispatch({
			type: 'ADD_VIDEO_ERROR',
			payload: {},
		});
	}
};

export const editVideo = (data, id, specialityName) => async (dispatch) => {
	try {
		const resVideo = await servicePost(`api/video/update/${id}`, data, {
			'Content-Type': 'application/json',
		});
		console.log(resVideo.data);
		dispatch({
			type: 'EDIT_VIDEO',
			payload: resVideo.data,
		});

		const resTopic = await serviceGet(`api/topic/get/${specialityName}`);

		console.log(resTopic.data);

		dispatch({
			type: 'GET_TOPICS',
			payload: resTopic.data,
		});
	} catch (error) {
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
				`api/article/delete/${videoId}/${topicId}`,
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

			dispatch({
				type: 'GET_TOPICS',
				payload: res2.data,
			});
		} catch (error) {
			dispatch({
				type: 'DELETE_VIDEO_ERROR',
				payload: {},
			});
		}
	};
