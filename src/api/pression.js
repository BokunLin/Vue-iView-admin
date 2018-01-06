import axios from './axios';

export function login({ name, pw, isSignup }) {
	let url = '/admin/user/login';
	if (isSignup) {
		url = '/admin/user/signup';
	}
	return axios.post(url, {
		name,
		pw
	})
}

export function checkLogin(user) {
	return axios.post('/admin/user/checkLogin', { user });
}