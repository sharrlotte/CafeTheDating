import { Button } from "../../components/ui/button";
import React, { useEffect, useState } from "react";
import Icons from "../../constants/icon";

const endTime = new Date("2023-12-12 18:47:00");

export default function MenuPage() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();

      const secLeft = endTime.getSeconds() - currentTime.getSeconds();
      const minuteLeft = endTime.getMinutes() - currentTime.getMinutes();
      const hourLeft = endTime.getHours() - currentTime.getHours();
      const dateLeft = endTime.getDate() - currentTime.getDate();

      const timeLeft = `${hourLeft + dateLeft * 24}:${
        minuteLeft > 0 ? minuteLeft : 60 + minuteLeft
      }:${secLeft > 0 ? secLeft : 60 + secLeft}`;

      setTime(timeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="p-4 flex w-full gap-10">
        <div className="flex border-2 p-1.5 gap-2 rounded-xl shadow-gray-200 shadow-md  w-full">
          <Icons.Search />

          <input
            className=" border-none outline-none text-2xl"
            type="text"
            placeholder="Tìm kiếm"
          />
        </div>
        <Button className="bg-[hsla(126,100%,24%,0.69)] rounded-full w-32">
          Tìm Kiếm
        </Button>
      </div>
      <div className="p-4 flex w-full flex-row">
        <div className="bg-black h-1/4 rounded-lg w-full">
          <div className="text-white flex flex-row  h-full p-8 gap-4 justify-between relative">
            <div className="flex flex-col gap-4 justify-center">
              <span className="text-sm">Lần đầu tiên! </span>
              <span className="text-3xl">Bánh kẹp bơ thanh longlong</span>
              <div className="gap-4 flex flex-row">
                <Button
                  variant="ghost"
                  className="border-[1px] rounded-3xl gap-2 flex group"
                >
                  <img
                    src="/img/Info.svg"
                    alt="Info"
                    className="w-5 h-5 group-hover:bg-black"
                  ></img>
                  Thông tin
                </Button>
                <Button
                  variant="ghost"
                  className="border-[1px] rounded-3xl flex gap-2"
                >
                  <img
                    src="/img/Delivery.svg"
                    alt="Delivery"
                    className="w-5 h-5"
                  ></img>
                  Đặt hàng ngay{" "}
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[hsla(126,100%,24%,0.69)] absolute left-[-30px] rounded-2xl py-2 px-4">
                Giảm 30%
              </div>
              <img
                className="flex"
                src="/img/BackgroundMenu.svg"
                alt="Menu"
              ></img>
            </div>
            <div className="bg-[hsla(32,98%,51%,1)] bottom-[-16px] left-0 rounded-sm py-2 px-20 absolute">
              {time}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
