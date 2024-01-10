import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const endTime = new Date('2023-12-28 21:47:00');

export default function Banner() {
	const [time, setTime] = useState('');
	useEffect(() => {
		const interval = setInterval(() => {
			const currentTime = new Date();

			const secLeft = endTime.getSeconds() - currentTime.getSeconds();
			const minuteLeft = endTime.getMinutes() - currentTime.getMinutes();
			const hourLeft = endTime.getHours() - currentTime.getHours();
			const dateLeft = endTime.getDate() - currentTime.getDate();

			const timeLeft = `${dateLeft ? dateLeft : ''}${hourLeft ? hourLeft : ''}:${minuteLeft > 0 ? minuteLeft : 60 + minuteLeft}:${secLeft > 0 ? secLeft : 60 + secLeft}`;

			setTime(timeLeft);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className='p-4'>
			<div className='bg-black h-1/4 rounded-lg w-full'>
				<div className='text-white flex flex-row  h-full p-4 md:p-8 gap-4 justify-between relative flex-wrap '>
					<div className='flex flex-col gap-4 justify-center'>
						<span className='text-sm'>Lần đầu tiên! </span>
						<span className='text-3xl'>Bánh kẹp bơ thanh longlong</span>
						<div className='gap-4 flex flex-row'>
							<Button
								variant='ghost'
								className='border-[1px] rounded-3xl gap-2 flex group'
							>
								<img
									src='/img/Info.svg'
									alt='Info'
									className='w-5 h-5 group-hover:bg-black'
								></img>
								Thông tin
							</Button>
							<Button
								variant='ghost'
								className='border-[1px] rounded-3xl flex gap-2 justify-center items-center '
							>
								<img
									src='/img/Delivery.svg'
									alt='Delivery'
									className='w-5 h-5'
								></img>
								Đặt hàng ngay
							</Button>
						</div>
					</div>
					<div className='relative'>
						<div className='bg-[hsla(126,100%,24%,0.69)] absolute md:left-[-30px] top-2 left-2 md:top-[-2px] rounded-2xl py-2 px-4'>Giảm 30%</div>
						<img
							className='flex'
							src='/img/BackgroundMenu.svg'
							alt='Menu'
						></img>
					</div>
					<div className='bg-[hsla(32,98%,51%,1)] bottom-[-16px] left-0 rounded-sm py-2 px-20 absolute'>{time}</div>
				</div>
			</div>
		</div>
	);
}
