const initialState = {
	topics: [],
};

export default function topicReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case 'GET_TOPICS':
			return {
				...state,
				topics: payload,
			};

		case 'GET_TOPICS_ERROR':
			return {
				...state,
			};

		default:
			return state;
	}
}
