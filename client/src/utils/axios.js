/* 
用法：
$http({
	url: '',
	data: {},//post请求参数
	params: {},//拼接到url参数
	method: 'get'
}).then(res=>{
	
}).catch(err=>{
	
});
*/

import axios from 'axios'

const $http = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	withCredentials: true,
	timeout: 10000,
	method: 'post'
});


$http.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

$http.interceptors.response.use(
	(response) => {
		const res = response.data;
		// 正确状态
		if (res.code === '0000') {
			return res.data || true;
		}
		
		// 异常
		// Notify({ type: 'danger', message: res.desc || '请求异常，请稍后再试' });
		return undefined;
	},
	(error) => {
		// Notify({ type: 'danger', message: '网络出错了~' });
		
		return Promise.reject(error);
	}
);

export {
	$http
}
