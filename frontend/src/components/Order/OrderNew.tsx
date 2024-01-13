import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import Search from '../Search/Search';
import OrderItem from './OrderItem';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@radix-ui/react-select';
import { OrderState } from '@/type/Order';
import { translate } from '@/lib/util';

export default function Order() {
	const [filter, setFilter] = useState<OrderState>(undefined);
	return (
		<div className='p-2'>
			<div className='w-full hidden md:block'>
				<Search></Search>
				<div className='p-4 flex'>
					<Tabs
						defaultValue='all'
						className='w-full h-full '
					>
						<TabsList className='w-full  flex flex-wrap flex-row bg-[hsla(18,93%,59%,0.82)] h-36 md:h-20  md:justify-around '>
							<TabsTrigger
								className='font-bold text-black text-2xl hover:bg-white'
								value='all'
							>
								Tất cả
							</TabsTrigger>
							<TabsTrigger
								className='font-bold text-black text-2xl hover:bg-white'
								value='wait'
							>
								Chờ xử lý
							</TabsTrigger>

							<TabsTrigger
								className='font-bold text-black text-2xl hover:bg-white'
								value='complete'
							>
								Hoàn thành
							</TabsTrigger>
							<TabsTrigger
								className='font-bold text-black text-2xl hover:bg-white'
								value='cancelled'
							>
								Đã hủy
							</TabsTrigger>
						</TabsList>
						<TabsContent value='all'>
							<OrderItem filter={undefined} />
						</TabsContent>
						<TabsContent value='wait'>
							<OrderItem filter='pending' />
						</TabsContent>
						<TabsContent value='complete'>
							<OrderItem filter='completed' />
						</TabsContent>
						<TabsContent value='cancelled'>
							<OrderItem filter='canceled' />
						</TabsContent>
					</Tabs>
				</div>
			</div>
			<div className='md:hidden pt-2 pb-2 flex justify-start items-center text-black'>
				<div>
					<Select
						onValueChange={(value) => setFilter(value as OrderState)}
						value={filter}
						defaultValue={filter}
					>
						<SelectTrigger
							className='w-[180px] h-10 text-left p-2 bg-white border-border border-2 rounded-lg '
							value={filter}
						>
							{translate(filter)}
						</SelectTrigger>

						<SelectContent className='w-[180px] rounded-lg p-2 bg-slate-200  mt-1'>
							<SelectGroup>
								<SelectItem
									key={'all'}
									value={'all'}
								>
									{translate('all')}
								</SelectItem>

								<div className='border-black h-1 w-full border-b'></div>
								<SelectItem
									key={'wait'}
									value={'pending'}
								>
									{translate('pending')}
								</SelectItem>

								<div className='border-black h-1 w-full border-b'></div>

								<SelectItem
									key={'complete'}
									value='completed'
								>
									{translate('completed')}
								</SelectItem>
								<div className='border-black h-1 w-full border-b'></div>

								<SelectItem
									key={'canceled'}
									value='canceled'
								>
									{translate('cancelled')}
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className='md:hidden'>
				<OrderItem filter={filter} />
			</div>
		</div>
	);
}
