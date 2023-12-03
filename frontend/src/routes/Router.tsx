import paths from '../constants/routes';
import HomePage from './home/HomePage';
import React, { ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

type RouteProps = {
	path: string;
	element: ReactNode;
};

const routes: RouteProps[] = [
	{
		path: paths.home,
		element: <HomePage />,
	},
];

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map((item) => (
					<Route
						key={item.path}
						path={item.path}
						element={item.element}
					/>
				))}
			</Routes>
		</BrowserRouter>
	);
}
