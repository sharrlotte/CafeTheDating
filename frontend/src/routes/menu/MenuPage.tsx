import { Button } from "../../components/ui/button";
import React, { useEffect, useState } from "react";
import Icons from "../../constants/icon";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useQuery } from "react-query";
import { getProducts } from "../../query/products";
import ProductCard from "../../components/Product/ProductCard";

const endTime = new Date("2023-12-21 18:47:00");

export default function MenuPage() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();

      const secLeft = endTime.getSeconds() - currentTime.getSeconds();
      const minuteLeft = endTime.getMinutes() - currentTime.getMinutes();
      const hourLeft = endTime.getHours() - currentTime.getHours();
      const dateLeft = endTime.getDate() - currentTime.getDate();

      const timeLeft = `${dateLeft ? dateLeft : ""}${
        hourLeft ? hourLeft : ""
      }:${minuteLeft > 0 ? minuteLeft : 60 + minuteLeft}:${
        secLeft > 0 ? secLeft : 60 + secLeft
      }`;

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
      <div className="w-full h-full flex p-2">
        <div className="w-full h-full">
          <Tabs defaultValue="account" className="w-full h-full">
            <TabsList className="w-full  flex justify-around">
              <TabsTrigger value="coffe">Cà Phê</TabsTrigger>
              <TabsTrigger value="milk">Trà Sữa</TabsTrigger>
              <TabsTrigger value="cake">Bánh</TabsTrigger>
              <TabsTrigger value="cream">Kem</TabsTrigger>
            </TabsList>
            <TabsContent value="coffe">
              <MenuItems />
            </TabsContent>

            <TabsContent value="milk" className="w-full h-full">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-[300px] ">
          <div className=" bg-[hsla(26,87%,51%,1)] text-center h-24 justify-center items-center flex text-white text-3xl">
            <Icons.Cart />
            Giỏ Hàng
          </div>
          <div className="rounded-sm border-2  divide-y text-center max-h-[50%] overflow-auto"></div>
          <div className="flex flex-col p-2 gap-4  rounded-lg border-2 ">
            <div className="flex  justify-evenly">
              <Button className="rounded-[30px] bg-[hsla(0,0%,93%,1)] text-black hover:bg-[hsla(26,87%,51%,1)] flex flex-col  h-24">
                <img src="/img/DeliveryScooter.svg" alt="DeliveryScooter"></img>
                Đặt Về
              </Button>

              <div className="border"></div>
              <Button className="rounded-[30px] bg-[hsla(0,0%,93%,1)] text-black  hover:bg-[hsla(26,87%,51%,1)] flex flex-col h-24">
                <img src="/img/NewStore.svg" alt="NewStore"></img>
                Đặt Bàn
              </Button>
            </div>
            <div className="border"></div>
            <div className="flex flex-col ">
              <span className=" font-bold">Thành tiền</span>
              <span className=" font-bold">Giảm giá</span>
              <span className=" font-bold">Phí vận chuyển</span>
              <span className=" font-bold"> Tổng :</span>
            </div>
            <div className="border"> </div>
            <div className="flex justify-center">
              <Button className="border-2 rounded-3xl bg-[hsla(0,0%,97%,1)] text-black hover:bg-[hsla(26,87%,51%,1)] w-60 flex justify-between">
                Mã giảm giá
                <Icons.ArrowRight></Icons.ArrowRight>
              </Button>
            </div>
            <div>
              <Button className=" text-xl border-2 rounded-3xl bg-[#5ec7e4] text-black hover:bg-[#5ec7e4] w-60 h-16  flex justify-between">
                Thanh toán
              </Button>
            </div>
            <div className="border "> </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItems() {
  const { data, isLoading, isError } = useQuery("products", getProducts);

  if (isLoading) return <span>Loading</span>;

  if (isError || !data) return <span>Error</span>;

  return (
    <div className="flex flex-wrap gap-2">
      {data.map((item) => (
        <ProductCard product={item} key={item.id} />
      ))}
    </div>
  );
}
