import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// interface LoginState {
//   userId: string;
//   token: string;
// }

export const useLoginStore = create(
  persist(
    () => ({
      userId: "",
      token: "",
    }),
    {
      name: "bot-angel-user", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// actions
export const login = (userId: string, token: string) => {
  console.log("userId", userId);
  if (userId) {
    useLoginStore.setState({ userId, token });
  }
};

export const logout = () =>
  useLoginStore.setState({
    userId: "",
    token: "",
  });
