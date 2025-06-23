import type { ThemeSliceType } from '@/types/theme-store.types';
import { getCSSVariable } from '@/utils/particles';
import type { StateCreator } from 'zustand';

const createThemeSlice: StateCreator<ThemeSliceType> = (set) => ({
  mode: 'light' as 'light' | 'dark',
  background: '',
  toggleTheme: () =>
    set((state) => ({
      mode: state.mode === 'light' ? 'dark' : 'light',
    })),
  updateBackground: () =>
    set(() => ({
      background: getCSSVariable('--foreground'),
    })),
});

export default createThemeSlice;
