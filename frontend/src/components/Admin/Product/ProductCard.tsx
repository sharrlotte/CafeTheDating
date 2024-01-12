import Product from '@/type/Product';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { pricy, translate } from '@/lib/util';
import { Button } from '@/components/ui/button';
import Icons from '@/constants/icon';
import { deleteProduct } from '@/query/products';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from 'react-query';
type ProductAdminCardProps = {
	product: Product[];
};
export default function ProductAdminCard({ product }: ProductAdminCardProps) {
	const queryClient = useQueryClient();

	const { isLoading, mutate } = useMutation({
		mutationFn: (id: string) => deleteProduct(id),
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError: () => {},
	});

	return (
		<>
			{isLoading && (
				<div className='fixed h-full w-full top-0 left-0 justify-center flex items-center backdrop-brightness-50 overflow-hidden'>
					<Icons.Loading />
				</div>
			)}
			<Table className='bg-white w-full h-full overflow-auto'>
				<TableHeader>
					<TableRow>
						<TableHead className='whitespace-nowrap'>Ảnh sản phẩm</TableHead>
						<TableHead className='w-[100px]'>Tên sản phẩm</TableHead>
						<TableHead>Loại</TableHead>
						<TableHead>Giá</TableHead>
						<TableHead>Giảm giá</TableHead>
						<TableHead>Mô tả</TableHead>
						<TableHead></TableHead>
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
							<TableCell className='min-w-0 max-w-[200px] overflow-hidden'>{item.description}</TableCell>
							<TableCell>
								<Button
									className='p-1 aspect-square'
									variant='ghost'
								>
									<Icons.Edit />
								</Button>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											className='p-1 aspect-square'
											variant='ghost'
										>
											<Icons.Delete />
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Bạn có chắc chắn muốn xóa sản phẩm này</AlertDialogTitle>
											<AlertDialogDescription>Hành động này không thể được khôi phục</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Hủy</AlertDialogCancel>
											<AlertDialogAction onClick={() => mutate(item._id)}>Xác nhận</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
