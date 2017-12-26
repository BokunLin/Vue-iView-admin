import axios from 'axios'
import { Message } from 'iview';
import router from '@/router';

const service = axios.create({
	timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => config, error => Promise.reject(error));

// respone拦截器
service.interceptors.response.use(
	response => {
		if (response.data.code === 5005) {
			Message.error('登录超时，请重新登录');
			sessionStorage.clear();
			router.push('/');
		}
		return response;
	},
	error => Promise.reject(error)
)

export default service;