import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import Icons from '@/constants/icon';
import Product from '@/type/Product';
import { UpdateProductRequest, updateProduct } from '@/query/products';
import { CreateProductRequest, formSchema } from '@/schema/products';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQueryClient } from 'react-query';
import LoadingFilter from '@/components/Common/LoadingFilter';

type UpdateProductProps = {
	product: Product;
};

export default function UpdateProduct({ product }: UpdateProductProps) {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const [open, setOpen] = useState(false);

	const { name, description, price, product_type, tags } = product;

	const form = useForm<CreateProductRequest>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name,
			description,
			price: Number(price),
			product_type,
			tags: tags ?? [],
			image: undefined,
		},
	});

	console.log(product);

	const { mutate, isLoading } = useMutation({
		mutationFn: async (value: UpdateProductRequest) => updateProduct(product._id, value),
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
						className='p-1 aspect-square'
						variant='ghost'
					>
						<Icons.Edit />
					</Button>
				</DialogTrigger>
				<DialogContent className='overflow-auto h-full'>
					<FormProvider {...form}>
						<h3 className='text-xl font-semibold'>Sửa thông tin</h3>
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
												onChange={(event) => field.onChange(Number(event.target.valueAsNumber) || 0)}
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
