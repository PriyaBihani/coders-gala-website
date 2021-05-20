const initialState = {};

export default function videoReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case 'ADD_VIDEO':
			return {
				...state,
				topics: payload,
			};

		case 'GET_VIDEO':
			return {
				...state,
				selectedVideo: payload.video,
			};
		case 'SELECT_VIDEO':
			return {
				...state,
				selectedVideo: payload.video,
			};
		case 'CLEAR_VIDEO':
			return {
				...state,
				selectedVideo: {},
			};

		case 'ADD_VIDEO_ERROR':
			return {
				...state,
			};

		default:
			return state;
	}
}
