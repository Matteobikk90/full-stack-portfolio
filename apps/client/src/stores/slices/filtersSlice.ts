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
      filters: {
        ...state.filters,
        [key]: Array.isArray(values)
          ? values.filter((v): v is string => typeof v === 'string')
          : [],
      },
    })),
  removeValue: (key, value) =>
    set((state) => {
      const current = state.filters[key];
      if (!Array.isArray(current)) return {};

      return {
        filters: {
          ...state.filters,
          [key]: current.filter((v) => v !== value),
        },
      };
    }),
  resetAll: () =>
    set({
      filters: {},
      category: null,
      categoryOpen: false,
      valueOpen: false,
    }),
});

export default createFiltersSlice;
