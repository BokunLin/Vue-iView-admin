import axios from './axios'

export function getTags(page) {
	return axios.get('/api/admin/tags/getList', { page });
}

export function add({ name }) {
	return axios.post('/api/admin/tags/add', { name });
}

export function edit(id) {
	return axios.post('/api/admin/tags/remove', { id });
}

export function remove(id) {
	return axios.post('/api/admin/tags/remove', { id });
}

