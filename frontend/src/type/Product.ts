interface Product {
	count: number;
	tags: ProductTag[];
	_id: string;
	product_type: ProductType;
	price: number;
	name: string;
	image: string;
}

export const productTypes = ['drink', 'icescream', 'food', 'cafe', 'milk', 'cake', 'cream'] as const;
export type ProductType = (typeof productTypes)[number];
export type ProductSort = 'discount' | 'best-choice' | 'new';
export type ProductTag = 'best-choice' | 'new';

export default Product;
