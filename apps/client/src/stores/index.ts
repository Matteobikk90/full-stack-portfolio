import createChatSlice from '@/stores/slices/chatSlice';
import createModalSlice from '@/stores/slices/modalSlice';
import createThemeSlice from '@/stores/slices/themeSlice';
import createWorkSlice from '@/stores/slices/workSlice';
import type { ChatSliceType } from '@/types/chat.types';
import type { ModalSliceType } from '@/types/modal-store.types';
import type { ThemeSliceType } from '@/types/theme-store.types';
import type { WorkSliceType } from '@/types/works.types';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

type StoreState = ModalSliceType &
  ThemeSliceType &
  ChatSliceType &
  WorkSliceType;

export const useStore = create(
  subscribeWithSelector<StoreState>((set, get, store) => ({
    ...createThemeSlice(set, get, store),
    ...createModalSlice(set, get, store),
    ...createChatSlice(set, get, store),
    ...createWorkSlice(set, get, store),
  }))
);
