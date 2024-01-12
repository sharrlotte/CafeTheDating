import useMe from '../../../zustand/useMe';
import Icons from '../../../constants/icon';
import { Link } from 'react-router-dom';
import Search from '@/components/Search/Search';
import AddItemsAdmin from '@/components/Admin/Product/AddProduct';
import MenuAdmin from '@/components/MenuAdmin/MenuAdmin';

const paths = [
	{
		name: 'Menu',
		icon: <Icons.MenuAdmin />,
		path: '/admin',
	},
	{
		name: 'Số liệu',
		icon: <Icons.Statistic />,
		path: '/statistic',
	},
	{
		name: 'Nhân viên',
		icon: <Icons.Employee />,
		path: '/employee',
	},
];

export default function Admin() {
	const me = useMe((state) => state.user);
	return (
		<nav className='flex items-start justify-center md:justify-start w-full h-full'>
			<div className='font-[500] bg-blue-500 p-2 gap-2 text-xl flex flex-col justify-start items-start h-full min-w-[200px]'>
				{paths.map((item, index) => (
					<Link
						key={index}
						className=' group hover:text-[hsla(29,90%,58%,1)]'
						to={item.path}
					>
						<span className='flex gap-5 justify-center items-center text-2xl text-white whitespace-nowrap'>
							{item.icon} {item.name}
						</span>
					</Link>
				))}
			</div>
			<div className='flex flex-col bg-white/30 h-full w-full backdrop-blur-sm overflow-auto'>
				<div className='w-full flex items-center justify-between p-2'>
					{me ? (
						<img
							src={me.avatar}
							alt='User Avatar'
							className='w-12 h-12 rounded-full'
						/>
					) : (
						<></>
					)}
					<Search />
					<AddItemsAdmin />
				</div>
				<MenuAdmin />
			</div>
		</nav>
	);
}
