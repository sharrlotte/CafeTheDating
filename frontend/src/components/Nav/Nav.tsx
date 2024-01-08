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
		<nav className='flex items-center justify-between md:justify-center  w-full  flex-wrap'>
			<a
				className='w-28  md:absolute  md:top-4 md:left-10'
				href='/home'
			>
				<img
					src='/img/Logo.svg'
					alt='TheDating'
				></img>
			</a>
			<div>
				{user ? (
					<div>
						<img
							src={user.avatar}
							alt='User Avatar'
							className='w-12 h-12 rounded-full absolute top-12 right-14'
						/>
						<Button onClick={() => logout()}>Đăng xuất</Button>
					</div>
				) : (
					<Button
						className='bg-[hsla(126,100%,24%,1)] rounded-full text-white w-24 h-14 top-12 right-14 md:absolute'
						asChild
					>
						<Link
							className=' group hover:text-[hsla(29,90%,58%,1)]'
							to={'/login'}
						>
							{'Login'}
						</Link>
					</Button>
				)}
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
		</nav>
	);
}
