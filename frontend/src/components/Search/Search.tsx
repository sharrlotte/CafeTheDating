import Icons from '../../constants/icon';

import { Button } from '../ui/button';

export default function Search() {
	return (
<<<<<<< HEAD
		<div className='p-4 flex m-auto md:w-1/2 gap-4 justify-center items-center flex-wrap md:flex-nowrap'>
			<div className='flex border-2 p-1.5 gap-2 rounded-full shadow-gray-200 shadow-md w-full'>
				<Icons.Search />

				<input
					className=' border-none outline-none text-2xl'
=======
		<div className='flex m-auto md:w-1/2 gap-4 justify-center items-center flex-wrap md:flex-nowrap '>
			<div className='flex border border-border p-0.5 gap-2 rounded-full bg-white/70 shadow-md w-full items-center'>
				<Icons.Search />
				<input
					className=' border-none outline-none text-2xl bg-transparent'
>>>>>>> 7faa6950625d3b4d0809f61ce1490665f65754db
					type='text'
					placeholder='Tìm kiếm'
				/>
			</div>
<<<<<<< HEAD
			<Button className='bg-[hsla(126,100%,24%,0.69)] hover:bg-orange-500 rounded-full w-32 h-full'>Tìm Kiếm</Button>
=======
			<Button className='bg-[hsla(126,100%,24%,0.69)] hover:bg-orange-500 flex rounded-full w-32 h-full'>Tìm Kiếm</Button>
>>>>>>> 7faa6950625d3b4d0809f61ce1490665f65754db
		</div>
	);
}
