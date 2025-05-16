import createThemeSlice from '@/stores/slices/themeSlice';
import type { StoreState } from '@/types/store.types';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useStore = create(
  subscribeWithSelector<StoreState>((set, get, store) => ({
    ...createThemeSlice(set, get, store),
  }))
);
