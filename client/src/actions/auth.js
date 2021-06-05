import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	SEND_RESET_EMAIL,
	SEND_RESET_EMAIL_FAIL,
} from './types';

import { serviceGet, servicePost, setAuthToken, isClient } from '../helpers';
import { errorToast, successToast } from './toast';

// Load User : Every time we logged in or register or refresh the page its gonna load.

export const loadUser = () => async (dispatch) => {
	console.log("loadUser")
	dispatch({
		type: 'SET_AUTH_LOADER',
	});

	console.log(isClient)
	if (isClient && localStorage.token) {
		setAuthToken(localStorage.token);
	}



	if (isClient && localStorage.userId) {
		const userId = localStorage.getItem('userId');

		try {
			const res = await serviceGet(`api/auth/user/${userId}`);
			// displayToast
			successToast(res);
			console.log('this is user', res.data)
			dispatch({
				type: "USER_LOADED",
				payload: res.data.user,
			});
		} catch (err) {
			// display toast
			errorToast(err);
			dispatch({
				type: AUTH_ERROR,
			});
		}
	}
};

export const refreshUser = (user) => async (dispatch) => {
	dispatch({
		type: 'SET_AUTH_LOADER',
	});
	if (isClient && localStorage.token) {
		setAuthToken(localStorage.token);
	}

	if (isClient && localStorage.userId) {
		const userId = localStorage.getItem('userId');

		try {
			// const res = await serviceGet(`api/auth/user/${userId}`);
			await serviceGet(`api/auth/user/${userId}`);

			dispatch({
				type: USER_LOADED,
				payload: user,
			});
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
			});
		}
	}
};

export const register = (data) => async (dispatch) => {
	dispatch({
		type: 'SET_AUTH_LOADER',
	});
	const headers = {
		'Content-Type': 'application/json',
	};

	const body = JSON.stringify(data);

	try {
		const res = await servicePost('api/auth/signup', body, headers);

		dispatch({
			type: res.status === 1 ? REGISTER_SUCCESS : REGISTER_FAIL,
			payload: res.data,
		});

		successToast(res);

		console.log(res);
		dispatch(loadUser());
	} catch (err) {
		// const errors = err.response.data.errors;
		errorToast(err);
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

export const login =
	({ email, password }) =>
		async (dispatch) => {
			dispatch({
				type: 'SET_AUTH_LOADER',
			});
			const headers = {
				'Content-Type': 'application/json',
			};

			const body = JSON.stringify({ email, password });

			try {
				const res = await servicePost('api/auth/login', body, headers);

				console.log(res);

				dispatch({
					type: res.status === 1 ? LOGIN_SUCCESS : LOGIN_FAIL,
					payload: { userId: res.data?.user?.userId, token: res.data?.token },
				});

				dispatch(loadUser());
				successToast(res);
			} catch (err) {
				console.log(err);
				errorToast(err);
				dispatch({
					type: LOGIN_FAIL,
				});
			}
		};

export const logout = () => (dispatch) => {
	if (isClient) localStorage.clear();
	dispatch({
		type: 'LOGOUT',
	});
};

export const sendResetEmail =
	({ email }) =>
		async (dispatch) => {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const body = JSON.stringify({ email });

			try {
				const res = await servicePost('/api/forgotpassword', body, config);

				const messagesArray = res.data.messages;
				// brand added message alert
				messagesArray.forEach((message) => dispatch((message.msg, 'danger')));
				dispatch({
					type: SEND_RESET_EMAIL,
					payload: res.data,
				});
			} catch (err) {
				const errors = err && err.response.data.errors;
				if (errors) {
				}
				dispatch({
					type: SEND_RESET_EMAIL_FAIL,
				});
			}
		};
