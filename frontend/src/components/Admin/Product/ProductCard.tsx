import Product from '@/type/Product';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { pricy, translate } from '@/lib/util';
import { Button } from '@/components/ui/button';
import Icons from '@/constants/icon';
type ProductAdminCardProps = {
	product: Product[];
};
export default function ProductAdminCard({ product }: ProductAdminCardProps) {
	return (
		<Table className='bg-white w-full h-full'>
			<TableHeader>
				<TableRow>
					<TableHead className='whitespace-nowrap'>Ảnh sản phẩm</TableHead>
					<TableHead className='w-[100px]'>Tên sản phẩm</TableHead>
					<TableHead>Loại</TableHead>
					<TableHead>Giá</TableHead>
					<TableHead>Giảm giá</TableHead>
					<TableHead className='text-right'>Mô tả</TableHead>
					<TableHead className='text-right'></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className='h-full overflow-y-auto'>
				{product.map((item) => (
					<TableRow key={item._id}>
						<TableCell className='w-24'>
							<img
								alt={item.name}
								src={item.image}
							></img>
						</TableCell>
						<TableCell className='font-medium whitespace-nowrap'>{item.name}</TableCell>
						<TableCell>{translate(item.product_type)}</TableCell>
						<TableCell>{pricy(item.price)}</TableCell>
						<TableCell>{item.discount || 0}%</TableCell>
						<TableCell className='text-right'>{item.description}</TableCell>
						<TableCell className='text-right'>
							<Button
								className='p-1 aspect-square'
								variant='ghost'
							>
								<Icons.Edit />
							</Button>
							<Button
								className='p-1 aspect-square'
								variant='ghost'
							>
								<Icons.Delete />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
