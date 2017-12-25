import axios from './axios';

export function login({ name, pw, isSignup }) {
	let url = '/api/admin/login';
	if (isSignup) {
		url = '/api/admin/signup';
	}
	return axios.post(url, {
		name,
		pw
	})
}