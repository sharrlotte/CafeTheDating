import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Search from "../Search/Search";
import OrderItem from "./OrderItem";

export default function Order() {
  return (
    <>
      <div className="w-full">
        <Search></Search>
        <div className="p-10  flex">
          <Tabs defaultValue="all" className="w-full h-full ">
            <TabsList className="w-full  flex justify-around bg-[hsla(18,93%,59%,0.82)] h-20  ">
              <TabsTrigger
                className="font-bold text-black text-2xl hover:bg-white"
                value="all"
              >
                Tất cả
              </TabsTrigger>
              <TabsTrigger
                className="font-bold text-black text-2xl hover:bg-white"
                value="wait"
              >
                Chờ thanh toán
              </TabsTrigger>
              <TabsTrigger
                className="font-bold text-black text-2xl hover:bg-white"
                value="ship"
              >
                Đang vận chuyển
              </TabsTrigger>
              <TabsTrigger
                className="font-bold text-black text-2xl hover:bg-white"
                value="complete"
              >
                Hoàn thành
              </TabsTrigger>
              <TabsTrigger
                className="font-bold text-black text-2xl hover:bg-white"
                value="cancelled"
              >
                Đã hủy
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <OrderItem />
            </TabsContent>
            <TabsContent value="wait">
              <OrderItem />
            </TabsContent>
            <TabsContent value="ship">
              <OrderItem />
            </TabsContent>
            <TabsContent value="complete">
              <OrderItem />
            </TabsContent>
            <TabsContent value="cancelled">
              <OrderItem />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
