import api from "../api/api";
import Product from "../type/Product";

const getProducts = async (): Promise<Product[]> => {
  return api
    .get("/products", { params: { type: "cafe" } })
    .then((result) => result.data);
};
export { getProducts };
