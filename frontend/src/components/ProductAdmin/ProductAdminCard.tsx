import Product from "@/type/Product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { pricy } from "@/lib/util";
type ProductAdminCardProps = {
  productadmins: Product[];
};
export default function ProductAdminCard({
  productadmins,
}: ProductAdminCardProps) {
  return (
    <Table className="bg-white w-full h-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Tên sản phẩm</TableHead>
          <TableHead>Loại</TableHead>
          <TableHead>Giá</TableHead>
          <TableHead>Giảm giá</TableHead>
          <TableHead className="text-right">Mô tả</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-full overflow-y-auto">
        {productadmins.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium whitespace-nowrap">
              {item.name}
            </TableCell>
            <TableCell>{translate(item.product_type)}</TableCell>
            <TableCell>{pricy(item.price)}</TableCell>
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
