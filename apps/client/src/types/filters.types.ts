import type { ExperienceTypes } from '@/types/experiences.types';
import type { WorkTypes } from '@/types/works.types';
import type { filterConfig } from '@/utils/filters';

export type FilterSliceType = {
  filters: Record<string, string[]>;
  category: FilterKey | null;
  categoryOpen: boolean;
  valueOpen: boolean;

  setCategory: (category: FilterKey | null) => void;
  toggleCategoryOpen: (open: boolean) => void;
  toggleValueOpen: () => void;

  setFilter: (key: string, values: string[]) => void;
  removeValue: (key: string, value: string) => void;
  resetAll: () => void;
};

export type FilterKey = keyof typeof filterConfig;

export type SearchResultTypes = {
  experiences: ExperienceTypes[];
  projects: WorkTypes[];
};

export type FilterRequestTypes = {
  technology?: string[];
  location?: string[];
  company?: string[];
};
