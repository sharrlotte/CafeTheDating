import { pricy } from "../../lib/util";
import Icons from "../../constants/icon";
import useCart from "../../zustand/useCart";

function CardItems() {
  const { products, removeProduct } = useCart();

  return (
    <div className="flex flex-col gap-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="relative group overflow-hidden border rounded-lg shadow-md"
        >
          <div className="p-4 bg-white flex flex-col relative">
            {product.count > 1 && (
              <span className="absolute top-4 left-1 bg-orange-400 text-white rounded-full  p-2">
                {`${product.count}x`}
              </span>
            )}
            <span className="text-green-700 font-bold mb-2 text-xl">
              {pricy(product.price)} vnd
            </span>
            <span className="text-2xl font-bold mb-2">{product.name}</span>
            <button
              className="absolute top-8 right-4"
              onClick={() => removeProduct(product)}
            >
              <Icons.Remove />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardItems;
