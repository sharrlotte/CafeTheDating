import React from "react";
type Filter = {
  filter: string;
};
export default function OrderItem({ filter }: Filter) {
  return (
    <>
      <div className="bg-[hsla(0,0%,96%,1)] w-full h-4"></div>
      <div className="bg-[hsla(0,0%,96%,1)] w-full h-[500px] ">
        <div className=" bg-red-200 w-full h-16 rounded-lg  ">
          <div className=" p-4 text-black font-bold flex justify-around items-center w-full h-full  ">
            <span>Mã vận chuyển</span>
            <span>Đơn hàng</span>
            <span>Phí vận chuyển</span>
            <span>Tổng tiền</span>
          </div>
        </div>
      </div>
    </>
  );
}
