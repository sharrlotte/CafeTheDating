import api from '@/api/api';
import About from '@/components/About/About';
import Footer from '@/components/Footer/Footer';
import Nav from '@/components/Nav/Nav';
import Auth from '@/layouts/Auth';
import { cn } from '@/lib/util';
import Admin from '@/routes/admin/menuadmin/Admin';
import HomePage from '@/routes/home/HomePage';
import LoginPage from '@/routes/login/LoginPage';
import MenuNew from '@/routes/menu/MenuNew';
import MenuPage from '@/routes/menu/MenuPage';
import User, { UserRole } from '@/type/User';
import useMe from '@/zustand/useMe';
import { ReactNode, useEffect } from 'react';
import { BrowserRouter, useLocation, Routes, Route } from 'react-router-dom';
import routes from '@/constants/routes';
import OrderNew from '@/components/Order/OrderNew';

type RouteProps = {
	path: string;
	element: ReactNode;
};

const paths: RouteProps[] = [
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: routes.home,
		element: <HomePage />,
	},
	{
		path: routes.login,
		element: <LoginPage />,
	},
	{
		path: routes.menu,
		element: <MenuPage />,
	},
	{
		path: routes.news,
		element: <MenuNew />,
	},
	{
		path: routes.about,
		element: <About />,
	},
	{
		path: routes.order,
		element: (
			<Auth roles={[UserRole.User, UserRole.Admin]}>
				<OrderNew />
			</Auth>
		),
	},
];

export default function Router() {
	return (
		<BrowserRouter>
			<BackgroundImage />
		</BrowserRouter>
	);
}

function BackgroundImage() {
	const { pathname } = useLocation();
	const { setMe } = useMe();

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');

		if (accessToken) {
			api.defaults.headers['Authorization'] = 'Bearer ' + accessToken;

			api
				.get('/users/@me/profile')
				.then((result) => {
					const user: User = result.data;
					setMe(user);
				})
				.catch(() => setMe());
		} else {
			setMe();
		}
	}, [setMe]);

	return (
		<div
			className={cn('flex flex-col h-full w-full', {
				'md:bg-main h-full w-full bg-center bg-cover bg-mobile-main': pathname === '/' || pathname === routes.home || pathname === routes.admin,
			})}
		>
			<Routes>
				{paths.map((item) => (
					<Route
						key={item.path}
						path={item.path}
						element={
							<>
								<Nav />
								{item.element}
								<Footer />
							</>
						}
					/>
				))}

				<Route
					key={routes.admin}
					path={routes.admin}
					element={
						<Auth roles={[UserRole.Admin]}>
							<Admin />
						</Auth>
					}
				/>
			</Routes>
		</div>
	);
}
