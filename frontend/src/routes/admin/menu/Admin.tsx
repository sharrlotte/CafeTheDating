import Icons from "../../../constants/icon";
import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import UserAvatar from "@/components/User/UserAvatar";
import useMe from "@/zustand/useMe";
import { cn } from "@/lib/util";
import routes from "@/constants/routes";

const paths = [
  {
    name: "Số liệu",
    icon: <Icons.Statistic />,
    path: routes.statistic,
  },
  {
    name: "Menu",
    icon: <Icons.MenuAdmin />,
    path: routes.admin,
  },
  {
    name: "Nhân viên",
    icon: <Icons.Employee />,
    path: routes.employee,
  },
  {
    name: "Đơn Hàng",
    icon: <Icons.Statistic />,
    path: routes.adminOrder,
  },
];

type AdminProps = {
  children: ReactNode;
};

export default function Admin({ children }: AdminProps) {
  const { user } = useMe();
  const { pathname } = useLocation();

  return (
    <nav className="flex items-start justify-center md:justify-start w-full h-full">
      <div className="flex bg-blue-500/90 justify-between h-full flex-col gap-4">
        <div>
          <img
            className="h-20 w-20 text-white"
            src="/img/Logo.svg"
            alt=""
          ></img>
          <div className="w-full h-[1px] bg-white"></div>
        </div>
        <div className="font-[500] text-xl flex flex-col justify-start items-start h-full min-w-[200px]">
          {paths.map((item, index) => (
            <Link
              className={cn("p-2 flex w-full hover:text-[hsla(29,90%,58%,1)]", {
                "bg-blue-200/40": pathname === item.path,
              })}
              key={index}
              to={item.path}
            >
              <span className="flex gap-2 justify-center items-center text-lg text-white whitespace-nowrap">
                {item.icon} {item.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex m-2 text-white p-2 justify-center items-center gap-2 border border-border rounded-md">
          <UserAvatar />
          {user?.username}
        </div>
      </div>
      <div className="flex flex-col bg-white/30 h-full w-full backdrop-blur-sm overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </nav>
  );
}
