import { create } from "zustand";

type EditAccountStore = {
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
  id?: string;
};

const useEditAccountStore = create<EditAccountStore>((set) => ({
  isOpen: false,
  onOpen: (id?: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
  id: undefined,
}));

export default useEditAccountStore;
