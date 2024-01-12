import Icons from '@/constants/icon';

import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog';

import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { createProduct } from '@/query/products';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
	name: z
		.string()
		.min(4, {
			message: 'Tên sản phẩm phải nhiều hơn 4 kí tự',
		})
		.max(40, { message: 'Tên sản phẩm phải ít hơn 40 kí tự' }),

	description: z
		.string()
		.min(4, {
			message: 'Tên sản phẩm phải nhiều hơn 4 kí tự',
		})
		.max(200, { message: 'Tên sản phẩm phải ít hơn 200 kí tự' }),

	price: z
		.number()
		.min(1, {
			message: 'Tên sản phẩm phải nhiều hơn 4 kí tự',
		})
		.max(10000000000, { message: 'Tên sản phẩm phải ít hơn 100 kí tự' }),

	product_type: z.string().min(1, {
		message: 'Loại không được bỏ trống',
	}),

	tags: z.array(
		z.string().min(1, {
			message: 'Ưu tiên không được bỏ trống',
		})
	),

	image: z
		.custom<File>()
		.refine(
			(file) => {
				return file instanceof File;
			},
			{
				message: 'Nhập file ảnh',
			}
		)
		.refine((file) => file && ['png', 'jpg', 'jpeg'].some((ext) => file.type.includes(ext)), {
			message: 'File ảnh không hợp lệ',
		}),
});

export type CreateProductRequest = z.infer<typeof formSchema>;

export default function AddProduct() {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

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

			console.log(error);
		},
	});

	return (
		<div>
			{isLoading && (
				<div className='fixed h-full w-full top-0 left-0 justify-center flex items-center backdrop-brightness-50 overflow-hidden'>
					<Icons.Loading />
				</div>
			)}
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
														console.log(event.target.files);
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
