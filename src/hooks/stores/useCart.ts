import { type Preset } from "@/types";
import { create } from "zustand";

type Cart = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  presets: Preset[];
  addPreset: (data: Preset) => void;
  removePreset: (id: string) => void;
};

export const useCart = create<Cart>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  presets: [],
  addPreset: (data) => set((prev) => ({ presets: [data, ...prev.presets] })),
  removePreset: (id) =>
    set((prev) => ({
      presets: prev.presets.filter(({ productId }) => productId !== id),
    })),
}));
