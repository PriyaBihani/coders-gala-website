import { isClient } from '../helpers';
const initialState = {
	openTopics: [],
	displayMode:
		isClient && localStorage.getItem('mode')
			? isClient && localStorage.getItem('mode')
			: 'light',
};

export default function uiReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case 'SET_OPEN_TOPICS':
			return {
				...state,
				openTopics: payload,
			};
		case 'SET_DISPLAY_MODE':
			return {
				...state,
				displayMode: payload,
			};

		default:
			return state;
	}
}
