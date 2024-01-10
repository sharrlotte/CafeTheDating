import paths from "../constants/routes";
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
import Auth from "@/layouts/Auth";
import Admin from "@/routes/admin/menuadmin/Admin";

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
    element: (
      <Auth roles={[UserRole.User, UserRole.Admin]}>
        <Order />
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
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      api.defaults.headers["Authorization"] = "Bearer " + accessToken;

      api
        .get("/users/@me/profile")
        .then((result) => {
          const user: User = result.data;
          setMe(user);
        })
        .catch(setMe)
        .finally();
    }
  }, [setMe]);

  return (
    <div
      className={cn("p-4", {
        "md:bg-main h-full w-full bg-center bg-cover bg-mobile-main":
          pathname === "/" || pathname === paths.admin,
      })}
    >
      <Routes>
        {routes.map((item) => (
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
          key={paths.admin}
          path={paths.admin}
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
