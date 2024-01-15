import { CreateProductRequest } from '@/schema/products';
import api from '../api/api';
import Product, { ProductSort, ProductType } from '../type/Product';
export async function getProducts(type: ProductType | undefined, sort?: ProductSort): Promise<Product[]> {
	return await api.get('/products', { params: { type, sort } }).then((result) => result.data);
}

export async function createProduct(request: CreateProductRequest) {
	return api.post('/products', request, {
		data: request,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}

export type UpdateProductRequest = CreateProductRequest;

export async function updateProduct(id: string, request: UpdateProductRequest) {
	return api.put(`/products/${id}`, request, {
		data: request,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}

export async function deleteProduct(id: string) {
	return await api.delete(`/products/${id}`);
}
