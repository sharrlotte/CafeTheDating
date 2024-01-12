import { env } from '../config/env';
import axios from 'axios';
import Lock from '@/lib/lock';

const lock = new Lock();

const api = axios.create({
	baseURL: env.backend_url,
});
function createAxiosResponseInterceptor() {
	const interceptor = api.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (error.response.status !== 401 || error.config.url === '/users/refresh_token') {
				return Promise.reject(error);
			}

			await lock.await();
			lock.acquire();

			console.log('request');

			api.interceptors.response.eject(interceptor);

			const requestToken = localStorage.getItem('refresh_token');

			if (!requestToken) {
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');

				lock.release();
				return Promise.reject(error);
			}

			return api
<<<<<<< HEAD
				.post('/users/refresh_token', {
=======
				.post('/users/refresh-token', {
<<<<<<< HEAD
>>>>>>> 93d82a8e4c94550cd17d67347d4cd1aa7b121353
					refresh_token: localStorage.getItem('refresh_token'),
=======
					refresh_token: requestToken,
>>>>>>> 7faa6950625d3b4d0809f61ce1490665f65754db
				})
				.then((response) => {
					localStorage.setItem('access_token', response.data.access_token);
					localStorage.setItem('refresh_token', response.data.refresh_token);

					error.response.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;

					return api(error.response.config);
				})
				.catch((error2) => {
					localStorage.removeItem('access_token');
					localStorage.removeItem('refresh_token');

					return Promise.reject(error2);
				})
				.finally(() => {
					lock.release();
					createAxiosResponseInterceptor();
				});
		}
	);
}
createAxiosResponseInterceptor();
export default api;
