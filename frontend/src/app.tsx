import { Toaster } from '@/components/ui/toaster';
import Router from './routes/Router';
import React from 'react';

export default function App() {
	return (
		<div className='w-full h-full'>
			<Router />
			<Toaster />
		</div>
	);
}
