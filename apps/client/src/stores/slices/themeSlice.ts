import type { ThemeSliceType } from '@/types/store.types';
import type { StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

const createThemeSlice = persist(
  (set) => ({
    mode: 'light' as 'light' | 'dark',
    toggle: () =>
      set((state) => ({
        mode: state.mode === 'light' ? 'dark' : 'light',
      })),
  }),
  {
    name: 'theme',
  }
) as StateCreator<ThemeSliceType>;

export default createThemeSlice;
