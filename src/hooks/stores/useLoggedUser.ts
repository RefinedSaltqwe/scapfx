import { type CurrentUserPrisma } from "@/types/prisma";
import { create } from "zustand";

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
    type: "",
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
        type: "",
        forgotPasswordId: "empty",
        ownedPresets: [],
      },
      ownedPresets: [],
    })),
}));
