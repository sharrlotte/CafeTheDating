import routes from "../constants/routes";
import HomePage from "./home/HomePage";
import React, { ReactNode, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";
import MenuPage from "./menu/MenuPage";
import MenuNew from "./menu/MenuNew";
import About from "../components/About/About";
import Order from "../components/Order/Order";
import { cn } from "../lib/util";
import User, { UserRole } from "@/type/User";
import useMe from "@/zustand/useMe";
import api from "@/api/api";
import MenuAdmin from "@/routes/admin/menuadmin/MenuAdmin";
import Auth from "@/layouts/Auth";
import OrderNew from "@/components/Order/OrderNew";

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
      className={cn("p-4", {
        "md:bg-main h-full w-full bg-center bg-cover bg-mobile-main":
          pathname === "/" || pathname === routes.admin,
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
              <MenuAdmin />
            </Auth>
          }
        />
      </Routes>
    </div>
  );
}
