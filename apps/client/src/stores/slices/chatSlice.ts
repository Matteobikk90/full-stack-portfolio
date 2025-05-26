import type { ChatSliceType } from '@/types/chat.types';
import type { StateCreator } from 'zustand';

const createModalSlice: StateCreator<ChatSliceType> = (set) => ({
  isChatOpen: false,
  openChat: () => set({ isChatOpen: true }),
  closeChat: () => set({ isChatOpen: false }),
});

export default createModalSlice;
