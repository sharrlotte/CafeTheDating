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

const useCart = create<UserState>((set) => {
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
                ? { ...item, count: item.count + 1 }
                : item
            ),
          };

          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        }
        const updatedCart = {
          products: [...prev.products, { ...product, count: 1 }],
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
                  ? { ...item, count: item.count - 1 }
                  : item
              )
              .filter((item) => item.count > 0),
          };

          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        }
        const updatedCart = {
          products: [...prev.products, { ...product, count: 1 }],
        };

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }),
  };
   

});

export default useCart;
