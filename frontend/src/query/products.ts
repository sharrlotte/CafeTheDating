import api from "../api/api";
import Product, { ProductSort, ProductType } from "../type/Product";

<<<<<<< HEAD
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

export async function deleteProduct(id: string) {
	return await api.delete(`/products/${id}`);
}
>>>>>>> 7faa6950625d3b4d0809f61ce1490665f65754db
