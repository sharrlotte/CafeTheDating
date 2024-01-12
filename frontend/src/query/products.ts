import api from '../api/api';
import Product, { ProductSort, ProductType } from '../type/Product';

export async function getProducts(type: ProductType | undefined, sort?: ProductSort): Promise<Product[]> {
	return await api.get('/products', { params: { type, sort } }).then((result) => result.data);
}
