import store from '../store';
import { isClient } from '../helpers';

export const setOpenTopics = (id) => async (dispatch) => {
	console.log(id);
	const openTopicsArray = store.getState().ui.openTopics;
	if (!openTopicsArray.includes(id)) {
		openTopicsArray.push(id);
	} else {
		openTopicsArray.splice(openTopicsArray.indexOf(id), 1);
	}

	dispatch({
		type: 'SET_OPEN_TOPICS',
		payload: openTopicsArray,
	});
};

export const setDisplayMode = () => async (dispatch) => {
	const displayMode =
		store.getState().ui.displayMode === 'dark' ? 'light' : 'dark';
	if (isClient) localStorage.setItem('mode', displayMode);

	dispatch({
		type: 'SET_DISPLAY_MODE',
		payload: displayMode,
	});
};
