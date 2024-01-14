import Icons from '@/constants/icon';

import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { createProduct } from '@/query/products';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { CreateProductRequest, formSchema } from '@/schema/products';
import LoadingFilter from '@/components/Common/LoadingFilter';

export default function AddProduct() {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const { toast } = useToast();

	const form = useForm<CreateProductRequest>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			price: 0,
			product_type: 'cafe',
			tags: [],
			image: undefined,
		},
	});

	const { mutate, isLoading } = useMutation({
		mutationFn: async (value: CreateProductRequest) => createProduct(value),
		onMutate: () => {
			setOpen(false);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
		},

		onError: (error: any) => {
			toast({
				title: 'Lỗi',
				description: 'Có lỗi đã xảy ra, vui lòng thử lại sau: ' + error.response.data.message,
			});
		},
	});

	return (
		<div>
			{isLoading && <LoadingFilter />}
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<DialogTrigger asChild>
					<Button
						className='flex justify-between w-full items-center'
						variant='outline'
					>
						<Icons.Plus />
						<span>Thêm món</span>
					</Button>
				</DialogTrigger>
				<DialogContent className='overflow-auto h-full'>
					<FormProvider {...form}>
						<h3 className='text-xl font-semibold'>Thêm món</h3>
						<form
							onSubmit={form.handleSubmit((data) => mutate(data))}
							className='space-y-8'
						>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tên sản phẩm</FormLabel>
										<FormControl>
											<Input
												placeholder='Tên'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='price'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Giá sản phẩm</FormLabel>
										<FormControl>
											<Input
												placeholder='Giá'
												{...field}
												type='number'
												onChange={(event) => field.onChange(event.target.valueAsNumber || 0)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='tags'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mức ưu tiên sản phẩm</FormLabel>
										<FormControl>
											<Select onValueChange={(value) => field.onChange([value])}>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Mức ưu tiên' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='best-choice'>Best choice</SelectItem>
													<SelectItem value='new'>New</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='product_type'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Loại sản phẩm</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className='w-full'>
													<SelectValue
														placeholder='Loại'
														defaultValue={field.value}
													/>
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='cafe'>Cà phê</SelectItem>
													<SelectItem value='milk'>Trà sữa</SelectItem>
													<SelectItem value='cream'>Kem</SelectItem>
													<SelectItem value='cake'>Bánh</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mô tả sản phẩm</FormLabel>
										<FormControl>
											<Input
												placeholder='Mô tả'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='image'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Hình minh họa</FormLabel>
										<br />
										<Button
											className='min-w-[100px]'
											variant='outline'
											asChild
										>
											<FormLabel htmlFor='image'>Tải</FormLabel>
										</Button>
										{field.value && (
											<img
												className='w-full'
												src={URL.createObjectURL(field.value)}
												alt='Ảnh minh họa'
											></img>
										)}
										<FormControl>
											<Input
												id='image'
												className='hidden'
												type='file'
												onChange={(event) => {
													if (event.target.files) {
														field.onChange(event.target.files[0]);
													}
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit'>Lưu</Button>
						</form>
					</FormProvider>
				</DialogContent>
			</Dialog>
		</div>
	);
}
