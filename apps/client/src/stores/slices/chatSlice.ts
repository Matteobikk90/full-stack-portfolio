import type { ChatSliceType } from '@/types/chat.types';
import type { StateCreator } from 'zustand';

const createModalSlice: StateCreator<ChatSliceType> = (set) => ({
  isChatOpen: false,
  openChat: () => set({ isChatOpen: true }),
  closeChat: () => set({ isChatOpen: false }),
  chatMode: 'admin',
  setChatMode: (mode) => set({ chatMode: mode }),
  aiMessages: {},
  setAiMessages: (userId, update) =>
    set((state) => ({
      aiMessages: {
        ...state.aiMessages,
        [userId]:
          typeof update === 'function'
            ? update(state.aiMessages[userId] ?? [])
            : update,
      },
    })),
});

export default createModalSlice;
