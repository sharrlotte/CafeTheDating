import Icons from "../../../constants/icon";
import { getProducts } from "../../../query/products";
import React from "react";
import { useQuery } from "react-query";
import { ProductSort, ProductType } from "@/type/Product";
import ProductAdminCard from "@/components/ProductAdmin/ProductAdminCard";

type MenuAdminItemProps = {
  type: ProductType;
  sort?: ProductSort;
};

export default function MenuAdminItems({ type, sort }: MenuAdminItemProps) {
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
        <ProductAdminCard key={item._id} productadmins={data} />
      ))}
    </div>
  );
}
