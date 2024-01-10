import { cn, pricy } from "../../lib/util";
import ProductAdmin from "../../type/ProductAdmin";
import useCart from "../../zustand/useCart";
import React from "react";
type ProductAdminCardProps = {
  productadmin: ProductAdmin;
};
export default function ProductAdminCard({ productadmin }: ProductAdminCardProps) {
  const addToCart = useCart((state) => state.addProduct);
  return (
    <div className="relative">
      <span className="right-5 top-2 absolute text-lg text-red-500 bg-white p-2 rounded-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {productadmin.tags.map((tag) => translate(tag))}
      </span>
      <div className="grid absolute left-4 bottom-4">
        <span className="text-white text-2xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  flex gap-2	">
          <span
            className={cn(
              "text-white text-2xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 	",
              { "line-through ": productadmin.discount > 0 }
            )}
          >
            {pricy(productadmin.price)}
          </span>
          <span>
            {productadmin.discount > 0 &&
              pricy(
                productadmin.price - (productadmin.price * (productadmin.discount ?? 0)) / 100
              )}
          </span>
        </span>
        <span className="text-orange-500 text-xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {translate(productadmin.product_type)}
        </span>
        <span className="text-white text-3xl font-bold border-orange-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {productadmin.name}
        </span>
      </div>
    </div>
  );
}
function translate(product_type: string) {
  switch (product_type) {
    case "cafe":
      return "Cà phê";
    case "milk":
      return "Trà sữa";
    case "cake":
      return "Bánh";
    case "cream":
      return "Kem";
    case "best-choice":
      return "Đề cử";
    case "new":
      return "Mới";
  }
}
