import { defaultPreset } from "@/data/default";
import { type PresetAndChildren } from "@/types/prisma";
import { create } from "zustand";

type UserStore = {
  presets: PresetAndChildren[];
  addPreset: (data: PresetAndChildren[]) => void;
  removeUser: () => void;
};

export const usePresets = create<UserStore>((set) => ({
  presets: [defaultPreset],
  addPreset: (data) =>
    set(() => ({
      presets: data,
    })),
  removeUser: () =>
    set(() => ({
      presets: [defaultPreset],
    })),
}));
