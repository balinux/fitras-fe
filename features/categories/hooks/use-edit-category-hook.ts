import { create } from "zustand";

type EditCategoryStore = {
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
  id?: string;
};

const useEditCategoryStore = create<EditCategoryStore>((set) => ({
  isOpen: false,
  onOpen: (id?: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
  id: undefined,
}));

export default useEditCategoryStore;
