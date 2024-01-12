import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function pricy(price: number) {
	const priceString = String(price);
	let result = '';
	for (let i = priceString.length - 1; i >= 0; i--) {
		let j = priceString.length - i - 1;
		if (j % 3 === 2 && i !== 0) {
			result = '.' + priceString[i] + result;
		} else {
			result = priceString[i] + result;
		}
	}

	return result + ' vnd';
}

export function translate(string: string | undefined) {
	switch (string) {
		case 'cafe':
			return 'Cà phê';
		case 'milk':
			return 'Trà sữa';
		case 'cake':
			return 'Bánh';
		case 'cream':
			return 'Kem';
		case 'best-choice':
			return 'Đề cử';
		case 'new':
			return 'Mới';
		case 'all':
			return 'Tất cả';
		case 'pending':
			return 'Chờ thanh toán';
		case 'completed':
			return 'Hoàn thành';
		case 'cancelled':
			return 'Đã hủy';
		case undefined:
			return 'Tất cả';
	}
}
