import axios from './axios';

export function publish(data) {
	return axios.post('/admin/products/publish', data);
}

export function getProducts(page) {
	return axios.get(`/admin/products/getList?page=${page}`)
}

export function findOne(id) {
	return axios.get(`/admin/products/findOne?id=${id}`)
}

export function edit(data) {
	return axios.post('/admin/products/edit', {
		data
	})
}

export function remove(id) {
	return axios.post('/admin/products/remove', {
		id
	})
}

export function banner(id, state) {
	return axios.post('/admin/products/banner', {
		id,
		state
	})
}