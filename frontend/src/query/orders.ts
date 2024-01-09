import api from "@/api/api";
import Order, { OrderState } from "@/type/Order";
import { CardItem } from "@/zustand/useCart";
import React from "react";

async function createOrder(orders: CardItem[]) {
  const form = new FormData();

  form.append("orders", JSON.stringify(orders));
  form.append("address", "123");

  return await api.post("/orders", form);
}
const getOrders = async (
  state: OrderState,
  user_id: string
): Promise<Order[]> => {
  return api
    .get("/orders", { params: { state, user_id } })
    .then((result) => result.data)
    .catch((error) => console.error(error));
};
export { getOrders, createOrder };
