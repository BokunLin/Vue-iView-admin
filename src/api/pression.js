import axios from './axios';

export function login({ user, pw, isSignup }) {
	let url = '/api/admin/login';
	if (isSignup) {
		url = '/api/admin/signup';
	}
	return axios.post(url, {
		user,
		pw
	})
}