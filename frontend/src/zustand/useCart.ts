import User from "../type/User";
import { create } from "zustand";

interface UserState {
  user: User | null;
  setMe: (by: User) => void;
}

const useMe = create<UserState>((set) => ({
  user: null,
  setMe: (user) => set(() => ({ user: user })),
}));

export default useMe;
