import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT,
	SEND_RESET_EMAIL,
} from '../actions/types';
import { isClient } from '../helpers/utils';

const initialState = {
	token: isClient && localStorage.getItem('token'),
	isAuthenticated: null,
	loading: false,
	user: null,
	isAdmin: null,
};

export default function authReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			console.log("auth payload ye hai", payload)
			return {
				...state,
				user: payload,
				isAuthenticated: true,
				isAdmin: payload.role === 0 ? false : true,
				loading: false,
			};
		case 'LIKE_ARTICLE':
			console.log(payload.user);
			return {
				...state,
				user: payload.user,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			isClient && localStorage.setItem('token', payload.token);
			isClient && localStorage.setItem('userId', payload.userId);
			console.log(payload);

			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};
		case REGISTER_FAIL:
			return {
				...state,
				loading: false,
			};
		case LOGIN_FAIL:
		case AUTH_ERROR:
			isClient && localStorage.removeItem('token');
			isClient && localStorage.removeItem('userId');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				userId: null,
			};
		case LOGOUT:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			};
		case SEND_RESET_EMAIL:
			return {
				...state,
				...payload,
			};

		case 'SET_AUTH_LOADER':
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}
