import type { ModalSliceType } from '@/types/modal-store.types';
import type { StateCreator } from 'zustand';

const createModalSlice: StateCreator<ModalSliceType> = (set) => ({
  isOpen: false,
  activeModal: null,
  toggleModal: (modal) =>
    set((state) => ({
      isOpen: modal ? true : !state.isOpen,
      activeModal: modal ?? null,
    })),
});

export default createModalSlice;
