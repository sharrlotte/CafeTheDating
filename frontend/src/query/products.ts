<<<<<<< HEAD
import api from "../api/api";
import Product, { ProductSort, ProductType } from "../type/Product";

const getProducts = async (
  type: ProductType,
  sort?: ProductSort
): Promise<Product[]> => {
  return api
    .get("/products", { params: { type, sort } })
    .then((result) => result.data);
};
export { getProducts };
=======
import { CreateProductRequest } from '@/components/Admin/Product/AddProduct';
import api from '../api/api';
import Product, { ProductSort, ProductType } from '../type/Product';

export async function createProduct(request: CreateProductRequest) {
	return api.post('/products', request, {
		data: request,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}
export async function getProducts(type: ProductType | undefined, sort?: ProductSort): Promise<Product[]> {
	return await api.get('/products', { params: { type, sort } }).then((result) => result.data);
}
>>>>>>> 93d82a8e4c94550cd17d67347d4cd1aa7b121353
