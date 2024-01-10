import useMe from '../../zustand/useMe';
import Icons from '../../constants/icon';
import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const paths = [
	{
		name: 'Home',
		path: '/home',
	},
	{
		name: 'Menu',
		path: '/menu',
	},
	{
		name: 'News',
		path: '/news',
	},
	{
		name: 'About',
		path: '/about',
	},
	{
		name: 'Order',
		path: '/order',
	},
];

export default function Nav() {
	const { user, logout } = useMe();

	return (
		<nav className='flex items-center justify-between   w-full  flex-wrap '>
			<div className='flex justify-start '>
				<a
					className='w-24 z-50 '
					href='/home'
				>
					<img
						src='/img/Logo.svg'
						alt='TheDating'
					></img>
				</a>
			</div>

			<div className='font-[600] bg-white p-5 gap-3 md:gap-8 text-xl flex border-2 rounded-full shadow-gray-200 shadow-md'>
				{paths.map((item, index) => (
					<Link
						key={index}
						className='group hover:text-[hsla(29,90%,58%,1)] relative flex justify-center items-center'
						to={item.path}
					>
						{item.name}
						<div className='opacity-0 group-hover:opacity-100 absolute translate-y-[20px] transition-opacity duration-500'>
							<Icons.Arrow className='w-5' />
						</div>
					</Link>
				))}
			</div>
			<div className='p-4 h-12'>
				{user ? (
					<div className='h-full w-full flex items-center justify-end gap-2 '>
						<img
							className='rounded-full h-12'
							src={user.avatar}
							alt='User Avatar'
						/>

						<Button
							className='bg-[hsla(126,100%,24%,0.69)] hover:bg-orange-500 rounded-full w-24 h-12 p-2 z-50'
							onClick={() => logout()}
						>
							Đăng xuất
						</Button>
					</div>
				) : (
					<div className='h-full w-full flex items-center justify-end '>
						<Button
							className='rounded-full bg-[hsla(126,100%,24%,0.69)] hover:bg-orange-500 w-24 h-12 '
							asChild
						>
							<Link to={'/login'}>Đăng Nhập</Link>
						</Button>
					</div>
				)}
			</div>
		</nav>
	);
}
