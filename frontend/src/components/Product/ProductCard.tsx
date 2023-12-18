import Product from "@/type/Product";
import React from "react";
type ProductCardProps = {
  product: Product;
};
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative">
      <img src={product.image} alt="Cà phê"></img>
      <span className="right-5 top-2 absolute text-red-500 bg-black p-2 rounded-lg">
        {product.tag}
      </span>
      <div className="grid absolute left-4 bottom-4">
        <span className="text-white text-2xl font-bold">{product.price} </span>
        <span className="text-orange-500 font-bold">{product.category}</span>
        <span className="text-white text-3xl font-bold">{product.name}</span>
      </div>
    </div>
  );
}
