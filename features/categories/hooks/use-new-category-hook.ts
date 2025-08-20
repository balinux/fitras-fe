import { create } from "zustand";

type NewCategoryStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useNewCategoryStore = create<NewCategoryStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useNewCategoryStore;
