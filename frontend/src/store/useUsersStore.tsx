import { create } from "zustand";

interface UsersState {
  users: User[];
  currentUser: User;
}

export const useUsersStore = create<UsersState>(() => ({
  users: [],
  currentUser: {} as User,
}));

export const setUsers = (users: User[]) => useUsersStore.setState({ users });
export const setCurrentUser = (user: User) =>
  useUsersStore.setState({ currentUser: user });
