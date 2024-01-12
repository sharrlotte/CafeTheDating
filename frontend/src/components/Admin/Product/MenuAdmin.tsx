import MenuAdminItems from '@/components/Admin/Product/MenuItems';
import { TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Tabs } from '../../ui/tabs';
import { productTypes } from '@/type/Product';
import { translate } from '@/lib/util';

export default function MenuAdmin() {
	return (
		<div className='h-full w-full flex flex-col max-w-full'>
			<div className='w-full h-full flex p-2 flex-col gap-2'>
				<div className='w-full h-full flex'>
					<Tabs
						defaultValue='all'
						className='w-full h-full'
					>
						<TabsList className='w-full flex justify-around bg-blue-500/90 p-2 text-white font-bold text-lg'>
							{['all', ...productTypes].map((item) => (
								<TabsTrigger
									key={item}
									className='data-[state=active]:bg-green-500 p-4 rounded-xl '
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
