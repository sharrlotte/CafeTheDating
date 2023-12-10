import Icons from "../../constants/icon";
import React from "react";

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
    path: "/ablou",
  },
  {
    name: "Order",
    path: "/order",
  },
];
export default function Nav() {
  return (
    <nav className="flex items-center justify-center w-full p-4">
      <div className="font-[600] bg-white p-5 gap-8 text-xl flex border-2 rounded-full shadow-gray-200 shadow-md">
        {paths.map((item) => (
          <a
            className=" group hover:text-[hsla(29,90%,58%,1)]"
            href={item.path}
          >
            {item.name}
            <Icons.Arrow className="opacity-0 group-hover:opacity-100 absolute w-4 translate-x-1/2 transition-opacity duration-200" />
          </a>
        ))}
      </div>
    </nav>
  );
}
