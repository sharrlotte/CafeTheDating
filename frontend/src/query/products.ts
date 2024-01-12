import { CreateProductRequest } from "@/components/AddItemsAdmin/AddItemsAdmin";
import api from "../api/api";
import Product, { ProductSort, ProductType } from "../type/Product";

const getProducts = async (
  type: ProductType | undefined,
  sort?: ProductSort
): Promise<Product[]> => {
  return api
    .get("/products", { params: { type, sort } })
    .then((result) => result.data);
};
export { getProducts };

export async function createProduct(request: CreateProductRequest) {
  return api.post("/products", request);
}
