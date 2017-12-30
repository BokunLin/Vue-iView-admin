import axios from './axios'

export function publish(data) {
	return axios.post('/api/admin/products/publish', data);
}

export function getProducts(page) {
	return axios.get(`/api/admin/products/getList?page=${page}`)
}

export function findOne(id) {
	return axios.get(`/api/admin/products/findOne?id=${id}`)
}

export function edit(data) {
	return axios.post('/api/admin/products/edit', {
		data
	})
}

export function remove(id) {
	return axios.post('/api/admin/products/remove', {
		id
	})
}