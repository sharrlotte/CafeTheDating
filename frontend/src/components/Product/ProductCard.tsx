import Product from "../../type/Product";
import useCart from "../../zustand/useCart";
import React from "react";
type ProductCardProps = {
  product: Product;
};
export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCart((state) => state.addProduct);
  return (
    <div className="relative">
      <img
        onClick={() => addToCart(product)}
        src={product.image}
        alt="Cà phê"
      ></img>
      <span className="right-5 top-2 absolute text-red-500 bg-black p-2 rounded-lg">
        {product.tags}
      </span>
      <div className="grid absolute left-4 bottom-4">
        <span className="text-white text-2xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {product.price}{" "}
        </span>
        <span className="text-orange-500 text-xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {translate(product.productType)}
        </span>
        <span className="text-white text-3xl font-bold border-orange-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {product.name}
        </span>
      </div>
    </div>
  );
}
function translate(productType: string) {
  switch (productType) {
    case "cafe":
      return "Cà phê";
    case "milk":
      return "Trà sữa";
    case "cake":
      return "Bánh";
    case "cream":
      return "Kem";
  }
}
