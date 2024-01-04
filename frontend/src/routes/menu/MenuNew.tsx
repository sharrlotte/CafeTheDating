import Search from "../../components/Search/Search";
import Banner from "../../components/Banner/Banner";
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import MenuItems from "./MenuItems";
import Icons from "@/constants/icon";
import CardItems from "@/components/Cart/CardItems";
import { Button } from "@/components/ui/button";
import { pricy } from "@/lib/util";
import useCart from "@/zustand/useCart";
export default function MenuNew() {
  const { products } = useCart();
  return (
    <>
      <Search />
      <Banner />
      <div className=" grid grid-cols-1 md:grid-cols-[1fr_auto] ">
        <div>
          <div className="font-bold text-black text-2xl">Đề cử !!</div>
          <Tabs defaultValue="coffe">
            <TabsList className="w-full  flex justify-around bg-white ">
              <div className="w-full h-full flex justify-between">
                <div>
                  <TabsTrigger className="text-lg" value="coffe">
                    Cà Phê
                  </TabsTrigger>
                  <TabsTrigger className="text-lg" value="milk">
                    Trà Sữa
                  </TabsTrigger>
                  <TabsTrigger className="text-lg" value="cake">
                    Bánh
                  </TabsTrigger>
                  <TabsTrigger className="text-lg" value="cream">
                    Kem
                  </TabsTrigger>
                </div>
              </div>
            </TabsList>
            <TabsContent value="coffe">
              <MenuItems type="cafe" sort="best-choice" />
            </TabsContent>
            <TabsContent value="milk">
              <MenuItems type="milk" sort="best-choice" />
            </TabsContent>
            <TabsContent value="cake">
              <MenuItems type="cake" sort="best-choice" />
            </TabsContent>
            <TabsContent value="cream">
              <MenuItems type="cream" sort="best-choice" />
            </TabsContent>
          </Tabs>

          <div className="font-bold text-[hsla(94,79%,35%,1)] text-2xl">
            Giảm giá !!!
          </div>
          <Tabs defaultValue="cream" className="w-full h-full ">
            <TabsList className="w-full  flex justify-around bg-white ">
              <div className="w-full h-full flex justify-between ">
                <div>
                  <TabsTrigger className="text-lg" value="coffe">
                    Cà Phê
                  </TabsTrigger>
                  <TabsTrigger className="text-lg" value="milk">
                    Trà Sữa
                  </TabsTrigger>
                  <TabsTrigger className="text-lg" value="cake">
                    Bánh
                  </TabsTrigger>
                  <TabsTrigger className="text-lg" value="cream">
                    Kem
                  </TabsTrigger>
                </div>
              </div>
            </TabsList>
            <TabsContent value="coffe">
              <MenuItems type="cafe" sort="discount" />
            </TabsContent>
            <TabsContent value="milk">
              <MenuItems type="milk" sort="discount" />
            </TabsContent>
            <TabsContent value="cake">
              <MenuItems type="cake" sort="discount" />
            </TabsContent>
            <TabsContent value="cream">
              <MenuItems type="cream" sort="discount" />
            </TabsContent>
          </Tabs>
        </div>
        <div className="p-4 flex w-full flex-row">
          <div className="w-full h-full flex p-2 md:flex-row flex-col gap-2">
            <div className="min-w-[300px]">
              <div
                id="cart"
                className=" bg-[hsla(26,87%,51%,1)] text-center h-24 justify-center items-center flex text-white text-3xl "
              >
                <Icons.Cart />
                Giỏ Hàng
              </div>
              <div className="rounded-sm border-2  divide-y text-center max-h-[50%] overflow-auto">
                <CardItems></CardItems>
              </div>

              <div className="flex flex-col p-2 gap-4  rounded-lg border-2 ">
                <div className="flex  justify-evenly">
                  <Button className="rounded-[30px] bg-[hsla(0,0%,93%,1)] text-black hover:bg-[hsla(26,87%,51%,1)] flex flex-col  h-24">
                    <img
                      src="/img/DeliveryScooter.svg"
                      alt="DeliveryScooter"
                    ></img>
                    Đặt Về
                  </Button>

                  <div className="border"></div>
                  <Button className="rounded-[30px] bg-[hsla(0,0%,93%,1)] text-black  hover:bg-[hsla(26,87%,51%,1)] flex flex-col h-24">
                    <img src="/img/NewStore.svg" alt="NewStore"></img>
                    Đặt Bàn
                  </Button>
                </div>
                <div className="border"></div>
                <div className="flex flex-col text-lg">
                  <div className="flex justify-between">
                    <span className=" font-bold">Thành tiền</span>
                    <span>
                      {pricy(
                        products
                          .map((item) => item.count * item.price)
                          .reduce((prev, curr) => prev + curr, 0)
                      )}
                      vnd
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className=" font-bold">Giảm giá</span>
                    <span>
                      {pricy(
                        products
                          .map((item) => item.count * item.price)
                          .reduce((prev, curr) => prev + curr, 0)
                      )}
                      vnd
                    </span>
                  </div>
                  <span className=" font-bold">Phí vận chuyển</span>
                  <div className="flex justify-between text-lg">
                    <span className=" font-bold"> Tổng :</span>
                    <span>
                      {pricy(
                        products
                          .map((item) => item.count * item.price)
                          .reduce((prev, curr) => prev + curr, 0)
                      )}
                      vnd
                    </span>
                  </div>
                </div>
                <div className="border"> </div>
                <div className="flex justify-center">
                  <Button className="border-2 rounded-3xl bg-[hsla(0,0%,97%,1)] text-black hover:bg-[hsla(26,87%,51%,1)] w-60 flex justify-between">
                    Mã giảm giá
                    <Icons.ArrowRight />
                  </Button>
                </div>

                <div className="border "> </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          className="bg-[hsla(26,87%,51%,1)] hover:bg-[hsla(26,87%,51%,1)] fixed bottom-1 right-1/2 translate-x-1/2 md:hidden "
          asChild
        >
          <a href="#cart">Xem giỏ hàng</a>
        </Button>
      </div>
    </>
  );
}
