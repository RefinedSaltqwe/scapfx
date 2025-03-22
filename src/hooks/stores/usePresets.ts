import { type PresetAndChildren } from "@/types/prisma";
import { create } from "zustand";

type UserStore = {
  presets: PresetAndChildren[];
  addPresets: (data: PresetAndChildren[]) => void;
  addPreset: (data: PresetAndChildren) => void;
  updatePreset: (data: PresetAndChildren) => void;
  removeUser: () => void;
};

export const usePresets = create<UserStore>((set) => ({
  presets: [],
  addPresets: (data) =>
    set(() => ({
      presets: data,
    })),
  addPreset: (data) => set((prev) => ({ presets: [...prev.presets, data] })),
  updatePreset: (data) =>
    set((prev) => ({
      presets: prev.presets.map((item) => (item.id === data.id ? data : item)),
    })),
  removeUser: () =>
    set(() => ({
      presets: [],
    })),
}));
