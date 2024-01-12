import Icons from '@/constants/icon';
import { UserRole } from '@/type/User';
import useMe from '@/zustand/useMe';
import { Navigate } from 'react-router-dom';

type AuthProps = {
	roles: UserRole[];
	children: JSX.Element;
};

export default function Auth({ roles, children }: AuthProps) {
	const { user, state } = useMe();

	if (state === 'loading') {
		return (
			<div className='flex justify-center w-full h-full'>
				<Icons.Loading />
			</div>
		);
	}

	if (!user || !user.role) {
		return <Navigate to={'/login'}></Navigate>;
	}

	if (roles.includes(user.role)) return children;

	return <Navigate to={'/login'}></Navigate>;
}
