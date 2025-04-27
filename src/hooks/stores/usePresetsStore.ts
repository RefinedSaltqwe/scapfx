import { type PresetAndChildren } from "@/types/prisma";
import { create } from "zustand";

export type PresetNav = {
  id: string;
  name: string;
  price: number;
  prevPrice: number;
};

type UserStore = {
  presets: PresetAndChildren[];
  presetNav: PresetNav[];
  addPresets: (data: PresetAndChildren[]) => void;
  addPresetNav: (data: PresetNav[]) => void;
  addPreset: (data: PresetAndChildren) => void;
  updatePreset: (data: PresetAndChildren) => void;
  removePresets: (id: string[]) => void;
};

export const usePresets = create<UserStore>((set) => ({
  presets: [],
  presetNav: [],
  addPresets: (data) =>
    set(() => ({
      presets: data,
    })),
  addPresetNav: (data) =>
    set(() => ({
      presetNav: data,
    })),
  addPreset: (data) => set((prev) => ({ presets: [data, ...prev.presets] })),
  updatePreset: (data) =>
    set((prev) => ({
      presets: prev.presets.map((item) => (item.id === data.id ? data : item)),
    })),
  removePresets: (id) =>
    set((prev) => ({
      presets: prev.presets.filter((item) => !id.includes(item.id)),
    })),
}));
