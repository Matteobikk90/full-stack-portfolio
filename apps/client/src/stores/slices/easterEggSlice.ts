import type { EasterEggSliceType } from '@/types/easter-egg.types';
import type { StateCreator } from 'zustand';

const createEasterEggSlice: StateCreator<EasterEggSliceType> = (set) => ({
  discovered: false,
  setDiscovered: () => set({ discovered: true }),
});

export default createEasterEggSlice;
