import Order from "../components/Order/Order";

interface Order {
	_id: string;
	price: number;
	discount: number;
	product_name: string;
	product_id: string;
	amount: number;
	address: string;
	size: string;
	user_id: string;
	state: string;
	created_at?: Date;
	updated_at?: Date;
}

export const orderStates = ['pending', 'accept', 'shipping', 'completed', 'canceled', 'refused', undefined] as const;

export type OrderState = (typeof orderStates)[number];

export default Order;
