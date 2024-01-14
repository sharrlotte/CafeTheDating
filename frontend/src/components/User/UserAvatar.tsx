import useMe from '@/zustand/useMe';
import React from 'react';

export default function UserAvatar() {
	const me = useMe((state) => state.user);

	if (!me) {
		return <></>;
	}

	return (
		<img
			src={me.avatar}
			alt='User Avatar'
			className='w-10 h-10 rounded-full'
		/>
	);
}
