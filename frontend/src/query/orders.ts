import api from '@/api/api';
import Order, { OrderState } from '@/type/Order';
import React from 'react'


const getOrders = async (
  state: OrderState,
user_id: string
): Promise<Order[]> => {
  return api.get("/orders", { params: {state, user_id } }).then((result) => result.data);
};
export { getOrders };
