import api from "../api/api";
import Product from "../type/Product";

const getProducts = async (type: string, sort?: string): Promise<Product[]> => {
  return api
    .get("/products", { params: { type, sort } })
    .then((result) => result.data);
};
export { getProducts };
