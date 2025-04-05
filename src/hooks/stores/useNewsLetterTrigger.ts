import { create } from "zustand";

type NewsLetter = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewsLetter = create<NewsLetter>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
