import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

import CardItems from '../../components/Cart/CardItems';

import Search from '../../components/Search/Search';
import Banner from '../../components/Banner/Banner';
import MenuItems from './MenuItems';

export default function MenuPage() {
	return (
		<div className='w-full'>
			<Search />
			<Banner />
			<div className='grid grid-cols-1 md:grid-cols-[1fr_auto]'>
				<div className='w-full h-full flex p-2 md:flex-row flex-col gap-2'>
					<div className='w-full h-full'>
						<Tabs
							defaultValue='coffe'
							className='w-full h-full'
						>
							<TabsList className='w-full  flex justify-around'>
								<TabsTrigger value='coffe'>Cà Phê</TabsTrigger>
								<TabsTrigger value='milk'>Trà Sữa</TabsTrigger>
								<TabsTrigger value='cake'>Bánh</TabsTrigger>
								<TabsTrigger value='cream'>Kem</TabsTrigger>
							</TabsList>
							<TabsContent value='cafe'>
								<MenuItems type='cafe' />
							</TabsContent>

							<TabsContent value='milk'>
								<MenuItems type='milk' />
							</TabsContent>
							<TabsContent value='cake'>
								<MenuItems type='cake' />
							</TabsContent>
							<TabsContent value='cream'>
								<MenuItems type='cream' />
							</TabsContent>
						</Tabs>
					</div>
				</div>
				<CardItems />
			</div>
		</div>
	);
}
