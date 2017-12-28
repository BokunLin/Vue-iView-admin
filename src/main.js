import Vue from 'vue'
import App from './App'
import router from './router'
//* 引入 iView 框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';
//* Vuex
import store from './store/index'

Vue.config.productionTip = false
Vue.use(iView);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
