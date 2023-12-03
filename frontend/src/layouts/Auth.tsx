import { Role } from '@/type/Role';
import React from 'react';

type AuthProps = {
	roles: Role[];
};

export default function Auth({ roles }: AuthProps) {
	return <div>Auth</div>;
}
