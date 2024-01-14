import api from '@/api/api';
import User, { UserRole } from '@/type/User';

export type PaginationRequest = {
	pageIndex: number;
	pageSize: number;
};

export type PaginationResult<Data> = {
	items: Data[];
	totalRow: number;
	totalPage: number;
    pageIndex: number
};

type GetAllUserRequest = PaginationRequest & {
	role: UserRole;
	query: string;
};

export async function getUsers(request: GetAllUserRequest): Promise<PaginationResult<User>> {
	return await api.get('/users', { params: request }).then((result) => result.data);
}

export async function changeRole(id: string, role: UserRole) {
	return await api.put(`/users/${id}`, { role }, { data: { role } }).then((result) => result.data);
}
