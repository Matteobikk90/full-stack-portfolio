import type { WorkSliceType } from '@/types/works.types';
import type { StateCreator } from 'zustand';

const createWorkSlice: StateCreator<WorkSliceType> = (set) => ({
  activeSlide: 0,
  setActiveSlide: (index: number) => set({ activeSlide: index }),
});

export default createWorkSlice;
