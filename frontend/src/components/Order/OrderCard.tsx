import Order from "@/type/Order";

import React from "react";
type OrderCardProps = {
  order: Order;
};

export default function OrderCard({ order }: OrderCardProps) {
  const calculateTotal = () => {
    const totalPrice =
      (order.price - ((order.discount || 0) * order.price) / 100) *
      order.amount;
    return totalPrice.toLocaleString();
  };
  return (
    <div className="min-h-[80px] w-full  bg-white  ">
      <div className="w-full bg-white flex flex-row justify-between items-center overflow-auto gap-4 ">
        <div className="w-full flex justify-center">
          <div className="break-all md:break-keep w-32">{order._id}</div>
        </div>

        <div className="w-full flex justify-center items-center  flex-col">
          <div className=" flex justify-center items-start flex-col">
            <span>Sản phẩm : {order.product_name}</span>
            <span>Số lượng: {order.amount}</span>
            <span>Giá: {order.price}</span>
            <span>Giảm giá: {order.discount || 0}% </span>

            <span>Tình trạng: {translate(order.state)}</span>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <p> {calculateTotal()} VND</p>
        </div>
      </div>
    </div>
  );
}
function translate(orderStates: string | undefined) {
  switch (orderStates) {
    case "all":
      return "Tất cả";
    case "pending":
      return "Chờ thanh toán";
    case "completed":
      return "Hoàn thành";
    case "cancelled":
      return "Đã hủy";
  }
}
