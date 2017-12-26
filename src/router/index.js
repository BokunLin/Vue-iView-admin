import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'iview'

import Store from '@/store/index'

import login from '@/views/login'
import index from '@/views/index'
import user from '@/views/user'
import products from '@/views/products'
import publishProducts from '@/views/publishProducts'
import classify from '@/views/classify'
import order from '@/views/order'

Vue.use(Router)

const router = new Router({
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
			redirect: '/index/user',
			component: index,
			meta: {
				icon: 'xx',
				label: '首页',
				hidden: true
			},
			children: [
				{
					path: 'user',
					name: 'user',
					component: user,
					meta: {
						icon: 'person',
						label: '用户管理',
						hidden: false
					}
				},
				{
					path: 'products',
					name: 'products',
					component: products,
					meta: {
						icon: 'ionic',
						label: '商品管理',
						hidden: false
					}
				},
				{
					path: 'publishProducts',
					name: 'publishProducts',
					component: publishProducts,
					meta: {
						icon: 'navigate',
						label: '商品发布',
						hidden: false
					}
				},
				{
					path: 'classify',
					name: 'classify',
					component: classify,
					meta: {
						icon: 'pricetag',
						label: '分类管理',
						hidden: false
					}
				},
				{
					path: 'order',
					name: 'order',
					component: order,
					meta: {
						icon: 'android-list',
						label: '订单管理',
						hidden: false
					}
				}
			]
		}
	]
})

router.beforeEach((to, from, next) => {
	//* 判断是否登录
	if (sessionStorage.user) {
		if (to.path === '/') {
			Store.dispatch('pression/checkLogin', sessionStorage.user).then(() => {
				Message.error('请勿重复登录');
				next('/index');
			})
		} else {
			next();
		}
	} else if (to.path === '/') {
		next();
	} else {
		Message.error('请先登录');
		next('/');
	}
})

export default router;


