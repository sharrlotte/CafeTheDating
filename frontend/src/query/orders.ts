import api from '@/api/api';
import { PaginationResult } from '@/query/users';
import Order, { OrderState } from '@/type/Order';
import { CardItem } from '@/zustand/useCart';

export async function createOrder(orders: CardItem[]) {
	return await api.post('/orders', {
		orders: orders.map((item) => ({ product_id: item._id, amount: item.amount })),
		address: 'bla bla',
	});
}

export async function updateOrder(id: string, state: OrderState) {
	return await api.put(`/orders/${id}`, { state }, { data: { state } });
}

export async function getOrders(state: OrderState | undefined, pageIndex: number): Promise<PaginationResult<Order>> {
	return api
		.get('/orders', { params: { state, pageIndex, pageSize: 40 } })
		.then((result) => result.data)
		.catch((error) => console.error(error));
}

export async function getMeOrders(state: OrderState, user_id: string): Promise<Order[]> {
	return api
		.get('users/@me/orders', { params: { state, user_id } })
		.then((result) => result.data)
		.catch((error) => console.error(error));
}
