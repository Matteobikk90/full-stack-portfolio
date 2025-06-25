import createChatSlice from '@/stores/slices/chatSlice';
import createEasterEggSlice from '@/stores/slices/easterEggSlice';
import createLangSlice from '@/stores/slices/langSlice';
import createModalSlice from '@/stores/slices/modalSlice';
import createThemeSlice from '@/stores/slices/themeSlice';
import createWorkSlice from '@/stores/slices/workSlice';
import type { ChatSliceType } from '@/types/chat.types';
import type { EasterEggSliceType } from '@/types/easter-egg.types';
import type { LangSliceType } from '@/types/lang.types';
import type { ModalSliceType } from '@/types/modal-store.types';
import type { ThemeSliceType } from '@/types/theme-store.types';
import type { WorkSliceType } from '@/types/works.types';
import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

type StoreState = ModalSliceType &
  ThemeSliceType &
  ChatSliceType &
  WorkSliceType &
  EasterEggSliceType &
  LangSliceType;

export const useStore = create<StoreState>()(
  persist(
    subscribeWithSelector((set, get, store) => ({
      ...createThemeSlice(set, get, store),
      ...createModalSlice(set, get, store),
      ...createChatSlice(set, get, store),
      ...createWorkSlice(set, get, store),
      ...createEasterEggSlice(set, get, store),
      ...createLangSlice(set, get, store),
    })),
    {
      name: 'global-store',
      partialize: ({ mode, discovered, lang, aiMessages }) => ({
        mode,
        discovered,
        lang,
        aiMessages,
      }),
    }
  )
);
