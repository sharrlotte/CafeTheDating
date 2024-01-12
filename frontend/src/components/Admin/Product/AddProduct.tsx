import Icons from '@/constants/icon';

import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog';

import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { createProduct } from '@/query/products';

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
		.string()
		.min(4, {
			message: 'Tên sản phẩm phải nhiều hơn 4 kí tự',
		})
		.max(100, { message: 'Tên sản phẩm phải ít hơn 100 kí tự' }),

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
				return file && file instanceof File;
			},
			{
				message: 'Nhập file ảnh',
			}
		)
		.refine((file) => ['png', 'jpg', 'jpeg'].some((ext) => file.type.includes(ext)), {
			message: 'File ảnh không hợp lệ',
		}),
});

export type CreateProductRequest = z.infer<typeof formSchema>;

export default function AddProduct() {
	const form = useForm<CreateProductRequest>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			price: '',
			product_type: '',
			tags: [],
			image: undefined,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		createProduct(values);
	}

	return (
		<div className=' p-4 items-center'>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant='outline'>
						<Icons.Plus />
						Thêm món
					</Button>
				</DialogTrigger>
				<DialogContent>
					<FormProvider {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
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
										<FormDescription>Tên sản phẩm sẽ hiển thị</FormDescription>
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
												defaultValue='cafe'
											>
												<SelectTrigger className='w-full'>
													<SelectValue
														placeholder='Loại'
														defaultValue='cafe'
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
										<FormControl>
											<Input
												type='file'
												placeholder='Ảnh'
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
