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
