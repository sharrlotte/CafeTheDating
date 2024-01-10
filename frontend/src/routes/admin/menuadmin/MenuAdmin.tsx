import useMe from '../../../zustand/useMe';
import Icons from '../../../constants/icon';
import { Link } from 'react-router-dom';
import Search from '@/components/Search/Search';
import AddItemsAdmin from '@/components/AddItemsAdmin/AddItemsAdmin';
import { TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Tabs } from '@/components/ui/tabs';
import MenuAdminItems from '@/routes/admin/menuadmin/MenuAdminItems';

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
		icon: <Icons.Employer />,
		path: '/employer',
	},
];

export default function MenuAdmin() {
	const me = useMe((state) => state.user);
	return (
		<nav className='flex items-start justify-center md:justify-start min-h-screen  w-full h-full'>
			<div className='font-[500] w-full/2 bg-[#5041BC] p-9  md:gap-9 text-xl flex flex-col border-2 justify-start items-start min-h-screen '>
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
			<div className=' bg-white/30 h-full w-full backdrop-blur-sm'>
				<div>
					{me ? (
						<img
							src={me.avatar}
							alt='User Avatar'
							className='w-12 h-12 rounded-full absolute top-12 right-14'
						/>
					) : (
						<></>
					)}
				</div>
				<Search />
				<AddItemsAdmin />
				<div className='grid grid-cols-1 md:grid-cols-[1fr_auto]'>
					<div className='w-full h-full flex p-2 md:flex-row flex-col gap-2'>
						<div className='w-full h-full'>
							<Tabs
								defaultValue='all'
								className='w-full h-full'
							>
								<TabsList className='w-full  flex justify-around bg-[hsla(50,200%,35%,1)] rounded-md p-8 font-bold text-2xl'>
									<TabsTrigger
										className='hover:bg-white p-4 rounded-xl '
										value='all'
									>
										Tất Cả
									</TabsTrigger>
									<TabsTrigger
										className='hover:bg-white p-4 rounded-xl '
										value='coffe'
									>
										Cà Phê
									</TabsTrigger>
									<TabsTrigger
										className='hover:bg-white p-4 rounded-xl '
										value='milk'
									>
										Trà Sữa
									</TabsTrigger>
									<TabsTrigger
										className='hover:bg-white p-4 rounded-xl '
										value='cake'
									>
										Bánh
									</TabsTrigger>
									<TabsTrigger
										className='hover:bg-white p-4 rounded-xl '
										value='cream'
									>
										Kem
									</TabsTrigger>
								</TabsList>
								<TabsContent value='all'>
									<MenuAdminItems type='cafe' />
									<MenuAdminItems type='milk' />
									<MenuAdminItems type='cake' />
									<MenuAdminItems type='cream' />
								</TabsContent>
								<TabsContent value='coffe'>
									<MenuAdminItems type='cafe' />
								</TabsContent>
								<TabsContent value='milk'>
									<MenuAdminItems type='milk' />
								</TabsContent>
								<TabsContent value='cake'>
									<MenuAdminItems type='cake' />
								</TabsContent>
								<TabsContent value='cream'>
									<MenuAdminItems type='cream' />
								</TabsContent>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
