import { login } from '@/api/pression'

const state = {
	user: ''
}

const getters = {
	getUser: state => state.user
}

const actions = {
	login: ({ commit }, data) => new Promise((reslove, reject) => {
		login(data).then(response => {
			if (response.data.code === 4004) {
				reject(response.data.msg);
			} else {
				commit('login', response.data.data);
				resolve();
			}
		})
	})
}

const mutations = {
	login: (state, data) => state.user = data
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}