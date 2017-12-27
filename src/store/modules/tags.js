import { getTags, add, edit, remove } from '@/api/tags'

const state = {
	tags: []
}

const getters = {
	getTags: state => state.tags
}

const callback = ({ fn, resolve = null, reject = null }, ...rest) => new Promise((res, rej) => {
	fn(...rest).then(res => {
		if (resolve) resolve(res)
		res(res)
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
	}, page)(),
	addTags: ({ commit }, data) => callback({ fn: add }, data),
	edit: ({ commit }, data) => callback({ fn: edit }, data),
	remove: ({ commit }, id) => callback({ fn: remove }, id)
}

const mutations = {
	fillTags: (state, data) => state.tags = data
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}