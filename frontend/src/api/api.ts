import { env } from '../config/env';
import axios from 'axios';

const api = axios.create({ baseURL: env.backend_url });
function createAxiosResponseInterceptor() {
	const interceptor = axios.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response.status !== 401) {
				return Promise.reject(error);
			}

			axios.interceptors.response.eject(interceptor);

			return axios
				.post('/users/refresh_token', {
					refresh_token: localStorage.getItem('refresh_token'),
				})
				.then((response) => {
					localStorage.setItem('access_token', response.data.access_token);
					localStorage.setItem('refresh_token', response.data.refresh_token);

					error.response.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;

					return axios(error.response.config);
				})
				.catch((error2) => {
					localStorage.removeItem('access_token');
					localStorage.removeItem('refresh_token');

					return Promise.reject(error2);
				})
				.finally(createAxiosResponseInterceptor);
		}
	);
}
createAxiosResponseInterceptor();
export default api;
