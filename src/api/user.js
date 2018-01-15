import axios from './axios';

export function getUser(page) {
	return axios.get('/admin/user', { params: { page } });
}

export function remove(id) {
	return axios.post('/admin/user', { id });
}

export function findUser(id) {
	return axios.get('/admin/user/find', { params: { id } })
}