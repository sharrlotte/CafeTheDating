import MenuAdminItems from '@/routes/admin/menu/MenuAdminItems';
import { TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Tabs } from '../ui/tabs';

export default function MenuAdmin() {
	return (
		<div className='h-full w-full flex flex-col max-w-full'>
			<div className='w-full h-full flex p-2 flex-col gap-2'>
				<div className='w-full h-full'>
					<Tabs
						defaultValue='all'
						className='w-full h-full'
					>
						<TabsList className='w-full flex justify-around bg-yellow-400 rounded-md p-8 font-bold text-2xl'>
							<TabsTrigger
								className='data-[state=active]:bg-white p-4 rounded-xl '
								value='all'
							>
								Tất Cả
							</TabsTrigger>
							<TabsTrigger
								className='data-[state=active]:bg-white p-4 rounded-xl '
								value='coffe'
							>
								Cà Phê
							</TabsTrigger>
							<TabsTrigger
								className='data-[state=active]:bg-white p-4 rounded-xl '
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
								className='data-[state=active]:bg-white p-4 rounded-xl '
								value='cream'
							>
								Kem
							</TabsTrigger>
						</TabsList>
						<TabsContent
							className='h-full'
							value='all'
						>
							<MenuAdminItems type={undefined} />
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
	);
}
