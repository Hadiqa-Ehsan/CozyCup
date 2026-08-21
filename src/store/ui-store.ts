import { create } from "zustand";

type UiState = {
  loading: boolean;
  modalOpen: boolean;
  setLoading: (loading: boolean) => void;
  setModalOpen: (open: boolean) => void;
  toggleModal: () => void;
};

export const useUiStore = create<UiState>()((set) => ({
  loading: false,
  modalOpen: false,
  setLoading: (loading) => set({ loading }),
  setModalOpen: (modalOpen) => set({ modalOpen }),
  toggleModal: () => set((state) => ({ modalOpen: !state.modalOpen })),
}));
