const initialState = { articles: [] };

export default function articleReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case 'ADD_ARTICLE':
			return {
				...state,
				topics: payload,
			};

		case 'GET_ARTICLE':
			return {
				...state,
				selectedArticle: payload.article,
			};
		case 'GET_ALL_ARTICLES':
			return {
				...state,
				articles: payload.articles,
			};
		case 'CLEAR_ARTICLE':
			return {
				...state,
				selectedArticle: {},
			};

		case 'ADD_ARTICLE_ERROR':
			return {
				...state,
			};

		default:
			return state;
	}
}
