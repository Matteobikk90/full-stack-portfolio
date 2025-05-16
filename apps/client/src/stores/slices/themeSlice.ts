import type { ThemeSliceType } from '@/types/store.types';
import { getCSSVariable } from '@/utils/particles';
import type { StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

const createThemeSlice = persist(
  (set) => ({
    mode: 'light' as 'light' | 'dark',
    background: getCSSVariable('--foreground'),
    toggle: () =>
      set((state) => ({
        mode: state.mode === 'light' ? 'dark' : 'light',
      })),
    updateBackground: () =>
      set(() => ({
        background: getCSSVariable('--background'),
      })),
  }),
  {
    name: 'theme',
  }
) as StateCreator<ThemeSliceType>;

export default createThemeSlice;
