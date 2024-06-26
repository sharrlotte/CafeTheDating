interface Product {
	_id: string;
	price: number;
	name: string;
	product_type: ProductType;
	tags: ProductTag[];
	image: string;
	description: string;
	discount: number;
}

export const productTypes = ['cafe', 'milk', 'cake', 'cream'] as const;
export type ProductType = (typeof productTypes)[number];
export type ProductSort = 'discount' | 'best-choice' | 'new';
export type ProductTag = 'best-choice' | 'new';

export default Product;
