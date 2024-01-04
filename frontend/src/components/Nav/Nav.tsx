import useMe from "../../zustand/useMe";
import Icons from "../../constants/icon";
import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const paths = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Menu",
    path: "/menu",
  },
  {
    name: "News",
    path: "/news",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Order",
    path: "/order",
  },
];

export default function Nav() {
  const me = useMe((state) => state.user);

  return (
    <nav className="flex items-center justify-between md:justify-center  w-full  flex-wrap">
      <a className="w-28  md:absolute  md:top-4 md:left-10" href="/home">
        <img src="/img/Logo.svg" alt="TheDating"></img>
      </a>
      <div>
        {me ? (
          <img
            src={me.avatar?.value}
            alt="User Avatar"
            className="w-12 h-12 rounded-full absolute top-12 right-14"
          />
        ) : (
          <Button
            className="bg-[hsla(126,100%,24%,1)] rounded-full text-white w-24 h-14 top-12 right-14 md:absolute"
            asChild
          >
            <Link
              className=" group hover:text-[hsla(29,90%,58%,1)]"
              to={"/login"}
            >
              {"Login"}
            </Link>
          </Button>
        )}
      </div>
      <div className="font-[600] bg-white p-5 gap-3 md:gap-8 text-xl flex border-2 rounded-full shadow-gray-200 shadow-md">
        {paths.map((item, index) => (
          <Link
            key={index}
            className=" group hover:text-[hsla(29,90%,58%,1)]"
            to={item.path}
          >
            {item.name}
            <Icons.Arrow className="opacity-0 group-hover:opacity-100 absolute w-4 translate-x-1/2 transition-opacity duration-200" />
            <div className="top-12  right-12 absolute "></div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
