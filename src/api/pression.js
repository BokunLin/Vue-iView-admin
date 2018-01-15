import axios from './axios';

export function login({ name, pw, isSignup }) {
	let url = '/api/admin/user/login';
	if (isSignup) {
		url = '/api/admin/user/signup';
	}
	return axios.post(url, {
		name,
		pw
	})
}

export function checkLogin(user) {
	return axios.post('/api/admin/user/checkLogin', { user });
}

export function loginOut() {
	return axios.get('/api/admin/user/loginOut')
}