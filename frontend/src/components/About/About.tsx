import React from 'react';
import Search from '../Search/Search';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
export default function About() {
	return (
		<div className='p-2'>
			<Search />
			<div className='flex gap-2 flex-col'>
				<span className='md:text-5xl flex justify-center p-2 text-xl'>Hiểu hơn về The Dating !</span>
				<div className='bg-[hsla(0,0%,85%,1)] flex justify-center items-center p-2 rounded-xl'>
					<div>
						<div className='flex justify-center items-center'>
							<span className=' bg-[hsla(32,98%,51%,1)] rounded-2xl flex items-center justify-center w-full max-w-[70%] md:max-w-[50%] h-10 font-bold'>Cách The Dating phục vụ bạn</span>
						</div>
						<div className='flex p-2 gap-10 justify-center items-center flex-wrap '>
							<div className='bg-white h-80 w-72 flex flex-col justify-center items-center p-4 gap-2 rounded-lg'>
								<span className=' text-black font-bold text-center '>
									Đặt tại quán !
									<img
										className='p-2'
										src='/img/ShopOrder.svg'
										alt='Loading'
									></img>
								</span>
								<span className='text-[hsla(0,0%,0%,1)] text-lg text-center h-60 w-60'>Đặt hàng nhanh chóng ngay tại quán ăn</span>
							</div>
							<div className='bg-white h-80 w-72 flex flex-col justify-center items-center p-4 gap-8 rounded-lg'>
								<span className=' text-black font-bold text-center'>
									Sản phẩm chất lượng
									<img
										className='p-2'
										src='/img/QualityFood.svg'
										alt='Loading'
									></img>
								</span>
								<span className='text-[hsla(0,0%,0%,1)] text-lg text-center h-60 w-60'>Ngon , an toàn và đẹp mắt</span>
							</div>
							<div className='bg-white h-80 w-72 flex flex-col justify-center items-center p-4 gap-4 rounded-lg'>
								<span className=' text-black font-bold text-center'>
									Tiện lợi
									<img
										className='p-2'
										src='/img/ConvenienceFood.svg'
										alt='Loading'
									></img>
								</span>
								<span className='text-[hsla(0,0%,0%,1)] text-lg text-center h-60 w-60'>Nhanh gọn và dễ sử dụng</span>
							</div>
						</div>
					</div>
				</div>
				<div className='flex gap-2 flex-col rounded-md'>
					<div className='relative grid md:grid-cols-[1fr_auto] gap-2 grid-cols-1'>
						<div className='relative h-full flex'>
							<img
								className='min-h-[400px] h-full object-cover rounded-xl'
								src='/img/DeliveryPerson.jpg'
								alt='Loading'
							></img>
							<span className='text-white text-3xl font-bold bottom-24 left-10 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] absolute md:whitespace-nowrap'>Giao hàng tận nơi - Nhanh chóng tiện lợi</span>
							<Link
								to='/menu'
								className='px-4 border-none rounded-3xl bg-[hsla(26,87%,51%,1)] py-2  justify-center text-white hover:bg-[#ea5f6b] flex absolute bottom-12 left-20  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] '
							>
								Đặt hàng ngay
							</Link>
						</div>
						<div className='relative h-full'>
							<img
								className='min-h-[400px] rounded-xl'
								src='/img/Map.jpg'
								alt='Loading'
							></img>
						</div>
					</div>
					<div className='relative flex'>
						<img
							className='min-h-[400px] object-cover rounded-xl'
							src='/img/Chef.jpg'
							alt='Loading'
						></img>
						<div className=' flex absolute md:bottom-12 md:left-32 bottom-2 gap-2 left-2 flex-col'>
							<span className='text-white text-3xl font-bold md:bottom-24 md:left-32 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Phục vụ tận tâm</span>
							<Button className='border-none rounded-3xl bg-[hsla(26,87%,51%,1)] text-white hover:bg-[#ea5f6b] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Nhận xét ngay</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
