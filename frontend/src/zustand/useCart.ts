import Product from "../type/Product";
import { create } from "zustand";

export interface CardItem extends Product {
  amount: number;
}

interface CardState {
  products: CardItem[];
  addProduct: (by: Product) => void;
  removeProduct: (by: Product) => void;
  clear: () => void;
}

const useCart = create<CardState>((set) => {
  const storedCart = localStorage.getItem("cart");
  const initialCart = storedCart ? JSON.parse(storedCart) : { products: [] };

  return {
    products: initialCart.products,
    addProduct: (product: Product) =>
      set((prev) => {
        const existingProduct = prev.products.find(
          (item) => item._id === product._id
        );
        if (existingProduct) {
          const updatedCart = {
            products: prev.products.map((item) =>
              item._id === product._id
                ? { ...item, amount: item.amount + 1 }
                : item
            ),
          };

          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        }
        const updatedCart = {
          products: [...prev.products, { ...product, amount: 1 }],
        };

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }),
    removeProduct: (product: Product) =>
      set((prev) => {
        const existingProduct = prev.products.find(
          (item) => item._id === product._id
        );

        if (existingProduct) {
          const updatedCart = {
            products: prev.products
              .map((item) =>
                item._id === product._id
                  ? { ...item, amount: item.amount - 1 }
                  : item
              )
              .filter((item) => item.amount > 0),
          };

          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        }
        const updatedCart = {
          products: [...prev.products, { ...product, amount: 1 }],
        };

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }),
    clear: () => set((prev) => ({ ...prev, products: [] })),
  };
});

export default useCart;
