import createModalSlice from '@/stores/slices/modalSlice';
import createThemeSlice from '@/stores/slices/themeSlice';
import type { ModalSliceType } from '@/types/modal-store.types';
import type { ThemeSliceType } from '@/types/theme-store.types';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

type StoreState = ModalSliceType & ThemeSliceType;

export const useStore = create(
  subscribeWithSelector<StoreState>((set, get, store) => ({
    ...createThemeSlice(set, get, store),
    ...createModalSlice(set, get, store),
  }))
);
