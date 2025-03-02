import { defaultUser } from "@/data/default";
import { type PresetUser, type User } from "@/types";
import { create } from "zustand";

type UserStore = {
  user: User;
  ownedPresets: string[];
  addPreset: (data: PresetUser) => void;
  addUser: (data: User, ownedPresets: string[]) => void;
  removeUser: () => void;
};

export const useLoggedUser = create<UserStore>((set) => ({
  user: defaultUser,
  ownedPresets: [],
  addPreset: (data) =>
    set((prev) => ({
      user: { ...prev.user, ownedPresets: [data, ...prev.user.ownedPresets] },
    })),
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
