import axios from 'axios';
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
		const res = response.data;
		if (res.code === 5005) {
			Message.error(res.msg);
			sessionStorage.clear();
			router.push('/');
		} else if (res.code !== 2000) {
			return Promise.reject(res)
		} else {
			return res
		}
	},
	error => Promise.reject(error)
)

export default service;