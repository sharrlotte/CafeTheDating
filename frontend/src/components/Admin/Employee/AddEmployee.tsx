import LoadingFilter from '@/components/Common/LoadingFilter';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icons from '@/constants/icon';
import { changeRole, getUsers } from '@/query/users';
import { UserRole } from '@/type/User';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function AddEmployee() {
	const [query, setQuery] = useState('');
	const [open, setOpen] = useState(false);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger>
				<Button variant='outline'>
					<Icons.Plus />
					<span>Thêm nhân viên</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<div className='p-4 flex flex-col gap-2'>
					<Input
						type='search'
						placeholder='Tìm theo tên'
						value={query}
						onChange={(event) => setQuery(event.currentTarget.value)}
					/>
					<Data query={query} />
				</div>
			</DialogContent>
		</Dialog>
	);
}

type Props = {
	query: string;
};

function Data({ query }: Props) {
	const {
		data,
		isLoading: isPageLoading,
		isError,
	} = useQuery({
		queryFn: () =>
			getUsers({
				pageIndex: 1,
				pageSize: 20,
				query: query,
				role: UserRole.User,
			}),
		queryKey: [query],
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
		<div className='h-full w-full flex flex-col gap-1 '>
			{isLoading && <LoadingFilter />}
			{data.items.map((user) => (
				<Button
					className='flex justify-start'
					variant='outline'
					onClick={() => changeUserRole({ id: user._id, role: UserRole.Admin })}
				>
					{user.username}
				</Button>
			))}
		</div>
	);
}
