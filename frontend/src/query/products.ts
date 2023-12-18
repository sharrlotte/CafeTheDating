import Product from "../type/Product";

const getProducts = async () => {
  const result: Product[] = [
    {
      tag: "Best chose",
      id: "1",
      category: "Cà phê",
      price: 15000,
      name: "Cà phê đen đá",
      image: "/img/BlackCoffe.svg",
    },
    {
      tag: "New",
      id: "2",
      category: "Cà phê",
      price: 15000,
      name: "Cà phê sữa",
      image: "/img/MilkCoffe.svg",
    },
    {
      tag: "New",
      id: "2",
      category: "Cà phê",
      price: 15000,
      name: "Cà phê kem",
      image: "/img/CreamCoffe.svg",
    },
    {
      tag: "New",
      id: "2",
      category: "Cà phê",
      price: 15000,
      name: "Cà phê kem",
      image: "/img/CreamCoffe.svg",
    },
  ];
  return result;
};
export { getProducts };
