import axios from './axios';

export function getUser(page) {
	return axios.get('/api/admin/user', { params: { page } });
}

export function remove(id) {
	return axios.post('/api/admin/user', { id });
}

export function findUser(id) {
	return axios.get('/api/admin/user/find', { params: { id } })
}