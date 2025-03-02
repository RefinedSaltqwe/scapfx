import { defaultPreset } from "@/data/default";
import { type Preset } from "@/types";
import { create } from "zustand";

type UserStore = {
  presets: Preset[];
  addPreset: (data: Preset[]) => void;
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
