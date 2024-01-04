import Icons from "../../constants/icon";
import ProductCard from "../../components/Product/ProductCard";
import { getProducts } from "../../query/products";
import React from "react";
import { useQuery } from "react-query";

type MenuItemProps = {
  type: string;
  sort?: string
};

export default function MenuItems({ type, sort }: MenuItemProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", type, sort],
    queryFn: () => getProducts(type, sort),
  });
    
  if (isLoading)
    return (
      <div className="flex justify-center w-full ">
        <Icons.Loading />
      </div>
    );

  if (isError || !data) return <span>Error</span>;

  return (
    <div className="flex flex-wrap gap-2">
      {data.map((item) => (
        <ProductCard product={item} key={item._id} />
      ))}
    </div>
  );
}
