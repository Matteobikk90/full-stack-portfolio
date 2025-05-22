import type { ModalSliceType } from '@/types/modal-store.types';
import type { StateCreator } from 'zustand';

const createModalSlice: StateCreator<ModalSliceType> = (set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
});

export default createModalSlice;
