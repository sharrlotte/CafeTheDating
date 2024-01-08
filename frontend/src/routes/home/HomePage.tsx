import User from '../../type/User';
import api from '../../api/api';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useMe from '../../zustand/useMe';

export default function HomePage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { setMe } = useMe();

	useEffect(() => {
		const refresh_token = searchParams.get('refresh_token');

		if (refresh_token) {
			api
				.post('/users/refresh-token', { refresh_token: refresh_token })
				.then((result) => {
					localStorage.setItem('access_token', result.data.access_token);
					localStorage.setItem('refresh_token', result.data.refresh_token);

					api.defaults.headers['Authorization'] = 'Bearer ' + result.data.access_token;

					return api.get('/users/@me/profile').then((result) => {
						const user: User = result.data;
						setMe(user);
					});
				})
				.catch((err) => {})
				.finally(() => {
					setSearchParams({});
				});
		}
	}, [searchParams, setMe, setSearchParams]);
	return <div></div>;
}
