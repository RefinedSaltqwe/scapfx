import { create } from "zustand";

type CustomerModalStore = {
  modalIds?: string[];
  type: "preset" | "none";
  proceed: boolean;
  isOpen: boolean;
  onOpen: (ids: string[], type: "preset") => void;
  onIsProceed: (is: boolean) => void;
  onClose: () => void;
};

export const useDeleteManyModal = create<CustomerModalStore>((set) => ({
  modalId: [],
  type: "none",
  proceed: false,
  isOpen: false,
  onOpen: (ids: string[], type: "preset" | "none") =>
    set({ isOpen: true, modalIds: ids, type }),
  onIsProceed: (is: boolean) => set({ proceed: is }),
  onClose: () =>
    set({ isOpen: false, modalIds: [], proceed: false, type: "none" }),
}));
