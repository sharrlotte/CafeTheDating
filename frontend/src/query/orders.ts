import api from "@/api/api";
import Order, { OrderState } from "@/type/OrderNew";
import { CardItem } from "@/zustand/useCart";

async function createOrder(orders: CardItem[]) {
  return await api.post("/orders", {
    orders: orders.map((item) => ({
      product_id: item._id,
      amount: item.amount,
    })),
    address: "bla bla",
  });
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
