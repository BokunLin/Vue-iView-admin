import { login, checkLogin } from '@/api/pression'

const state = {
	user: ''
}

const getters = {
	getUser: state => state.user
}

const actions = {
	login: ({ commit }, data) => new Promise((resolve, reject) => {
		login(data).then(response => {
			commit('login', response.data);
			sessionStorage.user = response.data.name;
			resolve(response.msg);
		}).catch(err => {
			reject(err.msg);
		})
	}),
	checkLogin: (context, user) => new Promise((resolve, reject) => {
		checkLogin(user).then(res => {
			resolve(res.msg);
		}).catch(err => {
			reject(err.msg);
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