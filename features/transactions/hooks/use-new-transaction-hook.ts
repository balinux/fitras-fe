import { create } from "zustand";

type NewTransactionStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useNewTransactionStore = create<NewTransactionStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useNewTransactionStore;
