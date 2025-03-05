import { defaultUser } from "@/data/default";
import { type User } from "@/types";
import { create } from "zustand";

type UserStore = {
  user: User;
  ownedPresets: string[];
  addUser: (data: User, ownedPresets: string[]) => void;
  removeUser: () => void;
};

export const useLoggedUser = create<UserStore>((set) => ({
  user: defaultUser,
  ownedPresets: [],
  addUser: (data, ownedPresets) =>
    set(() => ({
      user: data,
      ownedPresets: ownedPresets,
    })),
  removeUser: () =>
    set(() => ({
      user: defaultUser,
      ownedPresets: [],
    })),
}));
