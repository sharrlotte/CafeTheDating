import Product from '@/type/Product';
import { TableCell } from '../../ui/table';
import { pricy, translate } from '@/lib/util';
import { Button } from '@/components/ui/button';
import Icons from '@/constants/icon';
import { deleteProduct } from '@/query/products';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from 'react-query';
import UpdateProduct from '@/components/Admin/Product/UpdateProduct';
import LoadingFilter from '@/components/Common/LoadingFilter';

type ProductAdminCardProps = {
	product: Product;
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
			<TableCell className='w-24'>
				<img
					alt={product.name}
					src={product.image}
				></img>
			</TableCell>
			<TableCell className='font-medium whitespace-nowrap'>{product.name}</TableCell>
			<TableCell>{translate(product.product_type)}</TableCell>
			<TableCell>{pricy(product.price)}</TableCell>
			<TableCell>{product.discount || 0}%</TableCell>
			<TableCell className='min-w-0 max-w-[200px] overflow-hidden'>{product.description}</TableCell>
			<TableCell>
				{isLoading && <LoadingFilter />}
				<UpdateProduct product={product} />
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
							<AlertDialogAction onClick={() => mutate(product._id)}>Xác nhận</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</TableCell>
		</>
	);
}
