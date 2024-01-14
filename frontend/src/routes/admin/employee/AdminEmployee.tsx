import AddEmployee from '@/components/Admin/Employee/AddEmployee';
import LoadingFilter from '@/components/Common/LoadingFilter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icons from '@/constants/icon';
import { changeRole, getUsers } from '@/query/users';
import { UserRole } from '@/type/User';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function AdminEmployee() {
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState('');

	return (
		<div className='p-4 flex flex-col h-full'>
			<div className='flex w-full justify-end gap-2'>
				<Input
					type='search'
					placeholder='Tìm theo tên'
					value={query}
					onChange={(event) => setQuery(event.currentTarget.value)}
				/>
				<AddEmployee />
			</div>
			<Data
				query={query}
				page={page}
				setPage={setPage}
			/>
		</div>
	);
}

type Props = {
	page: number;
	query: string;
	setPage: (func: (page: number) => number) => void;
};

function Data({ query, page, setPage }: Props) {
	const {
		data,
		isLoading: isPageLoading,
		isError,
	} = useQuery({
		queryFn: () =>
			getUsers({
				pageIndex: page,
				pageSize: 20,
				query: query,
				role: UserRole.Admin,
			}),
		queryKey: [page, query],
	});

	const queryClient = useQueryClient();

	const { isLoading, mutate: changeUserRole } = useMutation({
		mutationFn: ({ id, role }: { id: string; role: UserRole }) => changeRole(id, role),
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError: () => {},
	});

	if (isPageLoading) {
		return (
			<div className='flex justify-center items-center h-full w-full'>
				<Icons.Loading />
			</div>
		);
	}

	if (isError || !data) {
		return <span>Có lỗi xảy ra, vui lòng thử lại sau</span>;
	}

	return (
		<div className='h-full w-full flex flex-col justify-between relative overflow-auto'>
			{isLoading && <LoadingFilter />}
			<Table>
				<TableHeader className='sticky bg-white top-0'>
					<TableRow>
						<TableHead>Id</TableHead>
						<TableHead>Tên</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.items.map((user) => (
						<TableRow>
							<TableCell>{user._id}</TableCell>
							<TableCell>{user.username}</TableCell>
							<TableCell>
								<Button
									variant='ghost'
									onClick={() => changeUserRole({ id: user._id, role: UserRole.User })}
								>
									<Icons.Edit />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
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
					disabled={page >= data.totalPage}
					onClick={() => setPage((prev) => prev + 1)}
				>
					<Icons.ChevronRight />
				</Button>
			</div>
		</div>
	);
}
