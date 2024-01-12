import Product from "@/type/Product";
import useCart from "../../zustand/useCart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
type ProductAdminCardProps = {
  productadmins: Product[];
};
export default function ProductAdminCard({
  productadmins,
}: ProductAdminCardProps) {
  const addToCart = useCart((state) => state.addProduct);
  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Tên sản phẩm</TableHead>
          <TableHead>Giá</TableHead>
          <TableHead>Giảm giá</TableHead>
          <TableHead className="text-right">Mô tả</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productadmins.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium whitespace-nowrap">
              {item.name}
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.discount || 0}%</TableCell>
            <TableCell className="text-right">{item.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
function translate(product_type: string) {
	switch (product_type) {
		case 'cafe':
			return 'Cà phê';
		case 'milk':
			return 'Trà sữa';
		case 'cake':
			return 'Bánh';
		case 'cream':
			return 'Kem';
		case 'best-choice':
			return 'Đề cử';
		case 'new':
			return 'Mới';
	}
}
