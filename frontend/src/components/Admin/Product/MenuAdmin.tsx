import MenuAdminItems from '@/components/Admin/Product/MenuItems';
import { TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Tabs } from '../../ui/tabs';
import { productTypes } from '@/type/Product';
import { translate } from '@/lib/util';
import AddProduct from '@/components/Admin/Product/AddProduct';
import Search from '@/components/Search/Search';

export default function MenuAdmin() {
	return (
		<div className='h-full w-full flex flex-col p-2 gap-2 max-w-full'>
			<div className='flex gap-2'>
				<Search />
				<AddProduct />
			</div>
			<div className='w-full h-full flex flex-col gap-2'>
				<div className='w-full h-full flex'>
					<Tabs
						className='w-full h-full'
						defaultValue='all'
					>
						<TabsList className='w-full flex justify-around bg-blue-500/90 p-2 text-white font-bold text-lg'>
							{['all', ...productTypes].map((item) => (
								<TabsTrigger
									className='data-[state=active]:bg-green-400 p-2 rounded-sm'
									key={item}
									value={item}
								>
									{translate(item)}
								</TabsTrigger>
							))}
						</TabsList>
						<TabsContent
							className='h-full'
							value='all'
						>
							<MenuAdminItems type={undefined} />
						</TabsContent>
						<TabsContent value='cafe'>
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
