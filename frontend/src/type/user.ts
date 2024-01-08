interface User {
	_id?: string;
	username?: string;
	email: string;
	providerId?: string;
	provider?: AuthProvider;
	role?: UserRole;
	address?: string;
	avatar?: string;
	_destroy?: Boolean;
	created_at?: Date;
	updated_at?: Date;
}
export type AuthUser = {
	_id: string;
	role: UserRole;
	email: string;
};
export const authProviders = ['facebook', 'google'] as const;

export type AuthProvider = (typeof authProviders)[number];

export enum UserRole {
	Admin = 'Admin',
	Moderator = 'Moderator',
	User = 'User',
}
export default User;
