import Vue from 'vue'
import Router from 'vue-router'

import login from '@/views/login'
import index from '@/views/index'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'login',
			component: login
		},
		{
			path: '/index',
			name: 'index',
			component: index,
			meta: {
				icon: 'xx',
				label: '首页',
				hidden: true
			}
		}
	]
})
