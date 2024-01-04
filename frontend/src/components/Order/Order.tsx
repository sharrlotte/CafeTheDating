import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Search from "../Search/Search";
import OrderItem from "./OrderItem";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";


export default function Order() {
  return (
    <>
      <div className="w-full">
        <Search></Search>
        <div className="p-4 flex">
          <Tabs defaultValue="all" className="w-full h-full ">
            <TabsList className="w-full  flex flex-wrap flex-row bg-[hsla(18,93%,59%,0.82)] h-36 md:h-20  md:justify-around ">
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
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
