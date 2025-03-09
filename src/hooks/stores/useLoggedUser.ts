import { type Preset, type PresetUser, type User } from "@prisma/client";
import { create } from "zustand";

export type PresentUserWithPreset = PresetUser & {
  preset: Preset;
};

export type CurrentUserPrisma =
  | (User & {
      ownedPresets: PresentUserWithPreset[];
    })
  | null;

type UserStore = {
  user: CurrentUserPrisma;
  ownedPresets: string[];
  addUser: (data: CurrentUserPrisma, ownedPresets: string[]) => void;
  removeUser: () => void;
};

export const useLoggedUser = create<UserStore>((set) => ({
  user: {
    id: "empty",
    email: "empty",
    password: "empty",
    name: "empty",
    emailVerified: null,
    image: "empty",
    forgotPasswordId: "empty",
    ownedPresets: [],
  },
  ownedPresets: [],
  addUser: (data, ownedPresets) =>
    set(() => ({
      user: data,
      ownedPresets: ownedPresets,
    })),
  removeUser: () =>
    set(() => ({
      user: {
        id: "empty",
        email: "empty",
        password: "empty",
        name: "empty",
        emailVerified: null,
        image: "empty",
        forgotPasswordId: "empty",
        ownedPresets: [],
      },
      ownedPresets: [],
    })),
}));
