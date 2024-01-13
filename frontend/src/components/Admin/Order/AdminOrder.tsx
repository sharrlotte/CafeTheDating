import LoadingFilter from '@/components/Common/LoadingFilter';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icons from '@/constants/icon';
import { translate } from '@/lib/util';
import { getOrders, updateOrder } from '@/query/orders';
import { PaginationResult } from '@/query/users';
import Order, { OrderState } from '@/type/Order';
import { useState } from 'react';
import { UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query';

export default function AdminOrder() {
	const [orderState, setOrderState] = useState<OrderState>();
	const [pageIndex, setPageIndex] = useState(1);

	const query = useQuery({
		queryFn: () => getOrders(orderState, pageIndex),
		queryKey: [orderState, pageIndex],
	});

	return (
		<div className='flex flex-col h-full w-full gap-2 p-4'>
			<Select
				onValueChange={(value) => setOrderState(value as OrderState)}
				value={orderState}
				defaultValue={orderState}
			>
				<SelectTrigger
					className='w-[200px] h-10 text-left p-2 bg-white border-border border-2 rounded-lg '
					value={orderState}
				>
					{translate(orderState)}
				</SelectTrigger>
				<SelectContent className='w-[200px] rounded-lg p-2 bg-slate-200 mt-1'>
					<SelectGroup>
						<SelectItem
							key={'all'}
							value={'all'}
						>
							{translate('all')}
						</SelectItem>
						<SelectItem
							key={'wait'}
							value={'pending'}
						>
							{translate('pending')}
						</SelectItem>
						<SelectItem
							key={'complete'}
							value='completed'
						>
							{translate('completed')}
						</SelectItem>
						<SelectItem
							key={'canceled'}
							value='canceled'
						>
							{translate('cancelled')}
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<Data
				query={query}
				page={pageIndex}
				setPage={setPageIndex}
			/>
		</div>
	);
}

type Props = {
	query: UseQueryResult<PaginationResult<Order>, unknown>;
	page: number;
	setPage: (func: (page: number) => number) => void;
};

function Data({ query, page, setPage }: Props) {
	const { data, isLoading: isPageLoading, isError } = query;

	const queryClient = useQueryClient();

	const { isLoading, mutate } = useMutation({
		mutationFn: ({ id, state }: { id: string; state: OrderState }) => updateOrder(id, state),
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError: () => {},
	});

	const render = () => {
		if (isPageLoading) {
			return (
				<div className='col-span-full row-span-full flex justify-center items-center h-full w-full'>
					<Icons.Loading />
				</div>
			);
		}

		if (isError || !data) {
			return <span>Có lỗi xảy ra, vui lòng thử lại sau</span>;
		}

		return data.items.map((order) => (
			<TableRow>
				<TableCell>{order._id}</TableCell>
				<TableCell>{order.product_name}</TableCell>
				<TableCell>{order.amount}</TableCell>
				<TableCell>{order.discount}%</TableCell>
				<TableCell>{translate(order.state)}</TableCell>
				<TableCell>
					<Button
						variant='ghost'
						onClick={() => mutate({ id: order._id, state: 'accept' })}
					>
						<Icons.Tick />
					</Button>
					<Button
						variant='ghost'
						onClick={() => mutate({ id: order._id, state: 'refused' })}
					>
						<Icons.X />
					</Button>
				</TableCell>
			</TableRow>
		));
	};

	return (
		<div className='h-full w-full flex flex-col justify-between relative overflow-auto'>
			{isLoading && <LoadingFilter />}

			<Table>
				<TableHeader className='sticky bg-white top-0'>
					<TableRow>
						<TableHead>Id</TableHead>
						<TableHead>Tên sản phẩm</TableHead>
						<TableHead>Số lượng</TableHead>
						<TableHead>Giảm giá</TableHead>
						<TableHead>Trạng thái</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>{render()}</TableBody>
			</Table>
			<div className='flex gap-2 justify-end sticky bottom-0 bg-white'>
				<Button
					className='p-2'
					disabled={page <= 1}
					variant='outline'
					onClick={() => setPage((prev) => prev - 1)}
				>
					<Icons.ChevronLeft />
				</Button>
				<Button disabled>{page}</Button>
				<Button
					className='p-2'
					variant='outline'
					disabled={page >= (data ? data.totalPage : 0)}
					onClick={() => setPage((prev) => prev + 1)}
				>
					<Icons.ChevronRight />
				</Button>
			</div>
		</div>
	);
}
