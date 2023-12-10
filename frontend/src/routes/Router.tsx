import paths from "../constants/routes";
import HomePage from "./home/HomePage";
import React, { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";

type RouteProps = {
  path: string;
  element: ReactNode;
};

const routes: RouteProps[] = [
  {
    path: paths.home,
    element: <HomePage />,
  },
  {
    path: paths.login,
    element: <LoginPage />,
  },
];

export default function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        {routes.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
