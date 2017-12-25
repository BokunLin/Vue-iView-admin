import { login } from '@/api/pression'

const state = {
	user: ''
}

const getters = {
	getUser: state => state.user
}

const actions = {
	login: ({ commit }, data) => new Promise((resolve, reject) => {
		login(data).then(response => {
			console.log('response', response)
			if (response.data.code === 2000) {
				commit('login', response.data.data);
				sessionStorage.user = response.data.data.name;
				resolve(response.data.msg);
			} else {
				reject(response.data.msg);
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