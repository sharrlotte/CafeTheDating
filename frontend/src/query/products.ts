import api from "../api/api";
import Product from "../type/Product";

const getProducts = async (type: string): Promise<Product[]> => {
  return api
    .get("/products", { params: { type } })
    .then((result) => result.data);
};
export { getProducts };
