import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import moment from 'moment';

const diffTime = new Date('2024-1-17 21:47:00').getTime() - Date.now();
let duration = moment.duration(diffTime, 'milliseconds');
const interval = 1000;

export default function Banner() {
	const [time, setTime] = useState('');
	useEffect(() => {
		const intervalId = setInterval(() => {
			duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');

			setTime('Còn ' + duration.days() + ' ngày ' + duration.hours() + ' tiếng ' + duration.minutes() + ' phút ' + duration.seconds() + ' giây');
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className='p-4'>
			<div className='bg-black rounded-lg w-full'>
				<div className='text-white flex flex-row  h-full p-4 md:p-8 gap-4 justify-between relative flex-wrap '>
					<div className='flex flex-col gap-4 justify-center'>
						<span className='text-sm'>Lần đầu tiên! </span>
						<span className='text-3xl'>Bánh kẹp bơ thanh long</span>
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
