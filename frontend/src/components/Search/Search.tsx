import Icons from "../../constants/icon";

import { Button } from "../ui/button";

export default function Search() {
  return (
    <div className="p-4 flex w-full gap-10 justify-center items-center flex-wrap md:flex-nowrap">
      <div className="flex border-2 p-1.5 gap-2 rounded-xl shadow-gray-200 shadow-md w-full">
        <Icons.Search />

        <input
          className=" border-none outline-none text-2xl"
          type="text"
          placeholder="Tìm kiếm"
        />
      </div>
      <Button className="bg-[hsla(126,100%,24%,0.69)] rounded-full w-32 hover:bg-orange-500">
        Tìm Kiếm
      </Button>
    </div>
  );
}
