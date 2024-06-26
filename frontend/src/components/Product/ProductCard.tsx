import { cn, pricy, translate } from '../../lib/util';
import Product from '../../type/Product';
import useCart from '../../zustand/useCart';
import React from 'react';
type ProductCardProps = {
	product: Product;
};
export default function ProductCard({ product }: ProductCardProps) {
	const addToCart = useCart((state) => state.addProduct);
	return (
		<div className='relative'>
			<img
				className='w-[400px] object-cover overflow-hidden'
				onClick={() => addToCart(product)}
				src={product.image}
				alt={product.name}
			></img>
			<span className='right-5 top-2 absolute text-2xl text-white bg-green-400 p-2 rounded-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] '>{product.tags.map((tag) => translate(tag))}</span>
			<div className='grid absolute left-4 bottom-4'>
				<span className='text-white text-2xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  flex gap-2	'>
					<span className={cn('text-white text-2xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 	', { 'line-through ': product.discount > 0 })}>{pricy(product.price)}</span>
					<span>{product.discount > 0 && pricy(product.price - (product.price * (product.discount ?? 0)) / 100)}</span>
				</span>
				<span className='text-orange-500 text-xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{translate(product.product_type)}</span>
				<span className='text-white text-3xl font-bold border-orange-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{product.name}</span>
			</div>
		</div>
	);
}
