import type { ChatSliceType } from '@/types/chat.types';
import { tenDays } from '@/utils/constants';
import type { StateCreator } from 'zustand';

const createModalSlice: StateCreator<ChatSliceType> = (set, get) => ({
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
  clearOldAiMessages: () => {
    const now = Date.now();
    const updated = Object.fromEntries(
      Object.entries(get().aiMessages).map(([userId, messages]) => [
        userId,
        messages.filter(
          (msg) => now - new Date(msg.createdAt).getTime() < tenDays
        ),
      ])
    );

    set({ aiMessages: updated });
  },
});

export default createModalSlice;
