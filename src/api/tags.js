import axios from './axios'

export function getTags(page) {
	return axios.get('/admin/tags/getList', { page });
}

export function add({ name }) {
	return axios.post('/admin/tags/add', { name });
}

export function edit(obj) {
	return axios.post('/admin/tags/edit', obj);
}

export function remove(id) {
	return axios.post('/admin/tags/remove', { id });
}

