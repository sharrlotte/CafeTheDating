import Icons from "../../constants/icon";

import { Button } from "../ui/button";

export default function Search() {
  return (
    <div className="flex m-auto md:w-1/2 gap-4 justify-center items-center flex-wrap md:flex-nowrap">
      <div className="flex border border-border p-0.5 gap-2 rounded-full bg-white/70 shadow-md w-full">
        <Icons.Search />
        <input
          className=" border-none outline-none text-2xl bg-transparent"
          type="text"
          placeholder="Tìm kiếm"
        />
      </div>
      <Button className="bg-[hsla(126,100%,24%,0.69)] hover:bg-orange-500 flex rounded-full w-32 h-full">
        Tìm Kiếm
      </Button>
    </div>
  );
}
