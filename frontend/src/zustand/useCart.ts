import Product from "../type/Product";
import { create } from "zustand";

interface CardItem extends Product {
  count: number;
}

interface UserState {
  products: CardItem[];
  addProduct: (by: Product) => void;
  removeProduct: (by: Product) => void;
}

const useCart = create<UserState>((set) => ({
  products: [],
  addProduct: (product: Product) =>
    set((prev) => {
      const existingProduct = prev.products.find(
        (item) => item._id === product._id
      );
      if (existingProduct) {
        return {
          products: prev.products.map((item) =>
            item._id === product._id ? { ...item, count: item.count + 1 } : item
          ),
        };
      }
      return { products: [...prev.products, { ...product, count: 1 }] };
    }),
  removeProduct: (product: Product) =>
    set((prev) => {
      const existingProduct = prev.products.find(
        (item) => item._id === product._id
      );
      if (existingProduct) {
        return {
          products: prev.products
            .map((item) =>
              item._id === product._id
                ? { ...item, count: item.count - 1 }
                : item
            )
            .filter((item) => item.count > 0),
        };
      }
      return { products: [...prev.products, { ...product, count: 1 }] };
    }),
}));

export default useCart;
