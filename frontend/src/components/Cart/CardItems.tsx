import { cn, pricy } from '../../lib/util';
import Icons from '../../constants/icon';
import useCart from '../../zustand/useCart';
import { Button } from '../ui/button';
import { createOrder } from '@/query/orders';
import useMe from '@/zustand/useMe';
import { Link } from 'react-router-dom';

function CardItems() {
	const { products, removeProduct, clear } = useCart();
	const { user } = useMe();

	function handleOrder() {
		createOrder(products);
		clear();
	}
	return (
		<>
			<div className='flex w-full flex-row'>
				<div className='w-full h-full flex p-2 md:flex-row flex-col'>
					<div className='min-w-[300px] flex flex-col gap-1'>
						<div
							id='cart'
							className=' bg-[hsla(26,87%,51%,1)] text-center h-24 justify-center items-center flex text-white text-3xl '
						>
							<Icons.Cart />
							Giỏ Hàng
						</div>
						<div className='rounded-sm border-2 divide-y text-center max-h-[50%] overflow-auto grid gap-1'>
							<div className='flex flex-col gap-1 p-1'>
								{products.map((product) => (
									<div
										key={product._id}
										className='relative group overflow-hidden border rounded-lg shadow-md'
									>
										<div className='p-2 bg-white flex flex-col relative'>
											{product.amount > 1 && (
												<span
													className={cn('flex absolute top-4 left-1 bg-orange-400 text-white rounded-full aspect-square p-2 text-center leading-4', {
														'leading-6': product.amount >= 10,
														'leading-8': product.amount >= 100,
													})}
												>
													{' '}
													{product.amount}x
												</span>
											)}
											<span className='text-green-700 font-bold mb-2 text-xl'>{pricy(product.discount > 0 ? product.price - (product.price * (product.discount ?? 0)) / 100 : product.price)}</span>

											<span className='text-2xl font-bold mb-2'>{product.name}</span>
											<button
												className='absolute top-8 right-4'
												onClick={() => removeProduct(product)}
											>
												<Icons.Remove />
											</button>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className='flex flex-col p-2 gap-4  rounded-lg border-2 '>
							<div className='flex  justify-evenly'>
								<Button className='rounded-[30px] bg-[hsla(0,0%,93%,1)] text-black hover:bg-[hsla(26,87%,51%,1)] flex flex-col  h-24'>
									<img
										src='/img/DeliveryScooter.svg'
										alt='DeliveryScooter'
									></img>
									Đặt Về
								</Button>

								<div className='border'></div>
								<Button className='rounded-[30px] bg-[hsla(0,0%,93%,1)] text-black  hover:bg-[hsla(26,87%,51%,1)] flex flex-col h-24'>
									<img
										src='/img/NewStore.svg'
										alt='NewStore'
									></img>
									Đặt Bàn
								</Button>
							</div>
							<div className='border'></div>
							<div className='flex flex-col text-lg'>
								<div className='flex justify-between'>
									<span className=' font-bold'>Thành tiền</span>
									<span>
										{pricy(
											products
												.map((item) => {
													return item.discount > 0 ? ((item.price * (100 - item.discount)) / 100) * item.amount : item.price * item.amount;
												})

												.reduce((prev, curr) => prev + curr, 0)
										)}
									</span>
								</div>
								<div className='flex justify-between'>
									<span className=' font-bold'>Giảm giá</span>
									<span>0 vnd</span>
								</div>

								<div className='flex justify-between '>
									<span className=' font-bold'>Phí vận chuyển</span>
									<span>0 vnd</span>
								</div>
								<div className='flex justify-between text-lg'>
									<span className=' font-bold'> Tổng :</span>
									<span>
										{pricy(
											products
												.map((item) => {
													return item.discount > 0 ? ((item.price * (100 - item.discount)) / 100) * item.amount : item.price * item.amount;
												})

												.reduce((prev, curr) => prev + curr, 0)
										)}
									</span>
								</div>
							</div>
							<div className='border'> </div>
							<div className='flex justify-center'>
								<Button className='border-2 rounded-3xl bg-[hsla(0,0%,97%,1)] text-black hover:bg-[hsla(26,87%,51%,1)] w-60 flex justify-between'>
									Mã giảm giá
									<Icons.ArrowRight />
								</Button>
							</div>
							<div className='flex justify-center'>
								{user ? (
									<Button
										className='bg-[hsla(26,87%,51%,1)] hover:bg-orange-600	  rounded-3xl w-60 flex justify-center '
										onClick={() => handleOrder()}
									>
										<span>Đặt hàng</span>
									</Button>
								) : (
									<Button
										className='bg-[hsla(26,87%,51%,1)] hover:bg-orange-600	  rounded-3xl w-60 flex justify-center '
										variant='outline'
										asChild
									>
										<Link to='/login'>Đăng nhập để đặt hàng</Link>
									</Button>
								)}
							</div>
							<div className='border '> </div>
						</div>
					</div>
				</div>
			</div>
			<Button
				className='bg-[hsla(26,87%,51%,1)] hover:bg-[hsla(26,87%,51%,1)] fixed bottom-1 right-1/2 translate-x-1/2 md:hidden '
				asChild
			>
				<a href='#cart'>Xem giỏ hàng</a>
			</Button>
		</>
	);
}

export default CardItems;
