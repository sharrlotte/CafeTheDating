import api from "@/api/api";
import { CreateProductRequest } from "@/components/AddItemsAdmin/AddItemsAdmin";
import Product, { ProductType, ProductSort } from "@/type/Product";


export async function createProduct(request: CreateProductRequest) {
  return api.post("/products", request);
}
export async function getProducts(type: ProductType | undefined, sort?: ProductSort): Promise<Product[]> {
	return await api.get('/products', { params: { type, sort } }).then((result) => result.data);
}
