import { z } from 'zod';

export const formSchema = z.object({
	name: z
		.string()
		.min(4, {
			message: 'Tên sản phẩm phải nhiều hơn 4 kí tự',
		})
		.max(40, { message: 'Tên sản phẩm phải ít hơn 40 kí tự' }),

	description: z
		.string()
		.min(4, {
			message: 'Chú thích sản phẩm phải nhiều hơn 4 kí tự',
		})
		.max(200, { message: 'Chú thích sản phẩm phải ít hơn 200 kí tự' }),

	price: z
		.number()
		.min(1, {
			message: 'Giá sản phẩm phải lớn hơn 1',
		})
		.max(10000000000, { message: 'Giá sản phẩm phải nhỏ hơn 10000000000' }),

	product_type: z.string().min(1, {
		message: 'Loại không được bỏ trống',
	}),
	tags: z.array(z.string()).optional(),
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
		})
		.optional(),
});

export type CreateProductRequest = z.infer<typeof formSchema>;
