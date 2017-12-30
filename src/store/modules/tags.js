import { getTags, add, edit, remove } from '@/api/tags'
import { format } from '@/utils/moment'

const state = {
	tags: []
}

const getters = {
	getTags: state => state.tags
}

const callback = ({ fn, resolve = null, reject = null }, ...rest) => new Promise((res, rej) => {
	fn(...rest).then(result => {
		if (resolve) resolve(result)
		res(result)
	}).catch(err => {
		if (reject) reject(err)
		rej(err.msg)
	})
})

const actions = {
	getTags: ({ commit }, page) => callback({
		fn: getTags,
		resolve(res) {
			commit('fillTags', res.data)
		}
	}, page),
	add: ({ commit }, data) => callback({ fn: add }, data),
	edit: ({ commit }, data) => callback({ fn: edit }, data),
	remove: ({ commit }, id) => callback({ fn: remove }, id)
}

const mutations = {
	fillTags: (state, data) => {
		state.tags = data.map(el => {
			el.createTime = format(el.createTime);
			return el
		})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}