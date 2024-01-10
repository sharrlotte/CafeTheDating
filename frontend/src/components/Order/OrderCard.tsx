import Order from "@/type/Order";
import React from "react";
type OrderCardProps = {
  order: Order;
};
export default function OrderCard({ order }: OrderCardProps) {
  const calculateTotal = () => {
    const totalPrice = (order.price - (order.discount || 0)) * order.amount;
    return totalPrice.toLocaleString();
  };
  return (
    <div className="h-20 w-full  bg-white  ">
      <div className="w-full bg-white flex flex-row justify-between items-center">
        <div>{order._id}</div>
        <div>Số lượng: {order.amount}</div>
        <div>Giá: {order.price}</div>
        <p>Thành tiền: {calculateTotal()} VND</p>
      </div>
    </div>
  );
}
