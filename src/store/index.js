import Vue from 'vue';
import VueX from 'vuex';

//* 引入模型
import pression from './modules/pression';

//* 注入Vuex
Vue.use(VueX)

const debug = process.env.NODE_ENV !== 'production'

export default new VueX.Store({
	modules: {
		pression
	},
	strict: debug
})

