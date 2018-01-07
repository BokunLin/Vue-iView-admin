import axios from 'axios';

export function getOrder(page) {
	return axios.get('/admin/order', { params: { page } })
}

export function getAddress(id) {
	return axios.get('/admin/order/address', { params: { id } })
}

export function getSnapShoot(arr) {
	return axios.post('/admin/order/snapShoot', { arr });
}

export function remove(id) {
	return axios.post('/admin/order/remove', { id })
}