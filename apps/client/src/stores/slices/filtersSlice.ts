import type { FilterSliceType } from '@/types/filters.types';
import type { StateCreator } from 'zustand';

const createFiltersSlice: StateCreator<FilterSliceType> = (set) => ({
  filters: {},
  category: null,
  categoryOpen: false,
  valueOpen: false,

  setCategory: (category) => set({ category }),
  toggleCategoryOpen: (open: boolean) => set(() => ({ categoryOpen: open })),
  toggleValueOpen: () => set((state) => ({ valueOpen: !state.valueOpen })),

  setFilter: (key, values) =>
    set((state) => ({
      filters: { ...state.filters, [key]: values },
    })),
  removeValue: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: (state.filters[key] || []).filter((v) => v !== value),
      },
    })),
  resetAll: () =>
    set({
      filters: {},
      category: null,
      categoryOpen: false,
      valueOpen: false,
    }),
});

export default createFiltersSlice;
