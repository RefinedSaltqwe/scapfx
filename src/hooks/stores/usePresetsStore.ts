import { type PresetAndChildren } from "@/types/prisma";
import { create } from "zustand";

type UserStore = {
  presets: PresetAndChildren[];
  addPresets: (data: PresetAndChildren[]) => void;
  addPreset: (data: PresetAndChildren) => void;
  updatePreset: (data: PresetAndChildren) => void;
  removePresets: (id: string[]) => void;
};

export const usePresets = create<UserStore>((set) => ({
  presets: [],
  addPresets: (data) =>
    set(() => ({
      presets: data,
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
