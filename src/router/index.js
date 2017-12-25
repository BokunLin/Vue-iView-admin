import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'iview'

import login from '@/views/login'
import index from '@/views/index'
import products from '@/views/products'
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
			component: index,
			meta: {
				icon: 'xx',
				label: '首页',
				hidden: true
			},
			children: [
				{
					path: 'products',
					component: products,
					meta: {
						icon: 'ionic',
						label: '商品管理',
						hidden: false
					}
				},
				{
					path: 'order',
					component: order,
					meta: {
						icon: 'ionic',
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
			Message.error('请勿重复登录');
			next('/index');
		}
		next();
	} else if (to.path === '/') {
		next();
	} else {
		Message.error('请先登录');
		next('/');
	}
})

export default router;


