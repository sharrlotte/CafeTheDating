import Icons from "@/constants/icon";
import { getOrders } from "@/query/orders";
import { OrderState } from "@/type/Order";
import useMe from "@/zustand/useMe";
import React from "react";
import { useQuery } from "react-query";
import OrtherCard from "./OrderCard";

type Filter = {
  filter: OrderState;
};

export default function OrderItem({ filter }: Filter) {
  const { user } = useMe();
  const user_id = user?._id ?? "";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", filter, user_id],
    queryFn: () => getOrders(filter, user_id),
  });
  if (isLoading)
    return (
			<div className='flex justify-center w-full h-full'>
				<Icons.Loading />
			</div>
		);

  if (isError || !data) return <span>Error</span>;

  return (
    <>
      <div className="bg-[hsla(0,0%,96%,1)] w-full h-4"></div>
      <div className="bg-[hsla(0,0%,96%,1)] w-full h-[500px] ">
        <div className=" bg-red-200 w-full h-16 rounded-lg  ">
          <div className=" p-4 text-black font-bold flex justify-around items-center w-full h-full  ">
            <span>Mã Đơn</span>
            <span>Đơn hàng</span>
            <span>Tổng tiền</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 overflow-auto max-h-[90%] divide-y">
          {data.map((item) => (
            <OrtherCard order={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
}
