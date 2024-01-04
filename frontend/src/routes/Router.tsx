import paths from "../constants/routes";
import HomePage from "./home/HomePage";
import React, { ReactNode } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";
import MenuPage from "./menu/MenuPage";
import MenuNew from "./menu/MenuNew";
import About from "../components/About/About";
import Order from "../components/Order/Order";
import { cn } from "../lib/util";

type RouteProps = {
  path: string;
  element: ReactNode;
};

const routes: RouteProps[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: paths.home,
    element: <HomePage />,
  },
  {
    path: paths.login,
    element: <LoginPage />,
  },
  {
    path: paths.menu,
    element: <MenuPage />,
  },
  {
    path: paths.news,
    element: <MenuNew />,
  },
  {
    path: paths.about,
    element: <About />,
  },
  {
    path: paths.order,
    element: <Order />,
  },
];

export default function Router() {
  return (
    <BrowserRouter>
      <BackgroundImage />
      <Footer />
    </BrowserRouter>
  );
}

function BackgroundImage() {
  const { pathname } = useLocation();

  return (
    <div
      className={cn("p-4", {
        "md:bg-main h-full w-full bg-center bg-cover bg-mobile-main":
          pathname === "/" || pathname === paths.home,
      })}
    >
      <Nav />
      <Routes>
        {routes.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Routes>
    </div>
  );
}
