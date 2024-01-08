import User from '../type/User';
import { create } from 'zustand';

interface UserState {
	user: User | null;
	setMe: (by: User) => void;
	logout: () => void;
}

const useMe = create<UserState>((set) => ({
	user: null,
	setMe: (user) => set(() => ({ user: user })),
	logout: () =>
		set(() => {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');

			return { user: undefined };
		}),
}));

export default useMe;
