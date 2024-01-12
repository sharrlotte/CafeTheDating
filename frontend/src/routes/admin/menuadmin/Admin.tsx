import useMe from "../../../zustand/useMe";
import Icons from "../../../constants/icon";
import { Link } from "react-router-dom";
import Search from "@/components/Search/Search";
import AddItemsAdmin from "@/components/AddItemsAdmin/AddItemsAdmin";
import MenuAdmin from "@/components/MenuAdmin/MenuAdmin";

const paths = [
  {
    name: "Menu",
    icon: <Icons.MenuAdmin />,
    path: "/admin",
  },
  {
    name: "Số liệu",
    icon: <Icons.Statistic />,
    path: "/statistic",
  },
  {
    name: "Nhân viên",
    icon: <Icons.Employee />,
    path: "/employee",
  },
];

export default function Admin() {
  const me = useMe((state) => state.user);
  return (
    <nav className="flex items-start justify-center md:justify-start min-h-screen  w-full h-full">
      <div className="font-[500] w-full/2 bg-[#5041BC] p-9  md:gap-9 text-xl flex flex-col border-2 justify-start items-start min-h-screen ">
        {paths.map((item, index) => (
          <Link
            key={index}
            className=" group hover:text-[hsla(29,90%,58%,1)]"
            to={item.path}
          >
            <span className="flex gap-5 justify-center items-center text-2xl text-white whitespace-nowrap">
              {item.icon} {item.name}
            </span>
          </Link>
        ))}
      </div>
      <div className=" bg-white/30 h-full w-full backdrop-blur-sm">
        <div>
          {me ? (
            <img
              src={me.avatar}
              alt="User Avatar"
              className="w-12 h-12 rounded-full absolute top-12 right-14"
            />
          ) : (
            <></>
          )}
        </div>
        <Search />
        <AddItemsAdmin />
        <MenuAdmin />
      </div>
    </nav>
  );
}
