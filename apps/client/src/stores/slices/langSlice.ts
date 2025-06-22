import i18n from '@/config/i18n';
import type { LangSliceType } from '@/types/lang.types';
import type { StateCreator } from 'zustand';

const createLangSlice: StateCreator<LangSliceType> = (set) => ({
  lang: 'en',
  toggleLang: (lang: 'en' | 'it') => {
    i18n.changeLanguage(lang);
    set({ lang: lang });
  },
});

export default createLangSlice;
