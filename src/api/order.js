import axios from './axios';

export function getOrder(page) {
	return axios.get('/api/admin/order', { params: { page } })
}

export function getAddress(id) {
	return axios.get('/api/admin/order/address', { params: { id } })
}

export function getSnapShoot(arr) {
	return axios.post('/api/admin/order/snapShoot', { arr });
}

export function remove(id) {
	return axios.post('/api/admin/order/remove', { id })
}