import Icons from '../../../constants/icon';
import { getProducts } from '../../../query/products';
import React from 'react';
import { useQuery } from 'react-query';
import { ProductSort, ProductType } from '@/type/Product';
import ProductAdminCard from '@/components/Admin/Product/ProductCard';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../../ui/table';

type MenuAdminItemProps = {
	type: ProductType | undefined;
	sort?: ProductSort;
};

export default function MenuAdminItems({ type, sort }: MenuAdminItemProps) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['products', type, sort],
		queryFn: () => getProducts(type, sort),
	});

	const render = () => {
		if (isLoading)
			return (
				<div className='items-center col-span-full row-span-full justify-center w-full h-full'>
					<Icons.Loading />
				</div>
			);

		if (isError || !data) return <span>Error</span>;

		return data.map((product) => (
			<TableRow key={product._id}>
				<ProductAdminCard product={product} />
			</TableRow>
		));
	};

	return (
		<div className='w-full h-full overflow-auto flex'>
			<Table className='bg-white w-full h-full table'>
				<TableHeader className='sticky top-0 bg-white'>
					<TableRow>
						<TableHead className='whitespace-nowrap'>Ảnh sản phẩm</TableHead>
						<TableHead className='whitespace-nowrap'>Tên sản phẩm</TableHead>
						<TableHead className='whitespace-nowrap'>Loại</TableHead>
						<TableHead className='whitespace-nowrap'>Giá</TableHead>
						<TableHead className='whitespace-nowrap'>Giảm giá</TableHead>
						<TableHead className='whitespace-nowrap'>Mô tả</TableHead>
						<TableHead className='whitespace-nowrap'></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className='h-full overflow-y-auto'>{render()}</TableBody>
			</Table>
		</div>
	);
}
