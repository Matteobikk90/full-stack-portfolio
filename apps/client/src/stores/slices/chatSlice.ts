import type { ChatSliceType } from '@/types/chat.types';
import { tenDays } from '@/utils/constants';
import type { StateCreator } from 'zustand';

const createModalSlice: StateCreator<ChatSliceType> = (set, get) => ({
  isChatOpen: false,
  openChat: () => set({ isChatOpen: true }),
  closeChat: () => set({ isChatOpen: false }),
  chatMode: 'admin',
  setChatMode: (mode) => set({ chatMode: mode }),
  aiMessages: {
    'visitor-123': [
      {
        id: 'msg-1',
        content: 'Hello! How can I assist you with Matteo’s portfolio?',
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 min ago
        sender: {
          id: '',
          name: '',
          avatarUrl: '',
        },
        receiver: {
          id: '',
          name: '',
          avatarUrl: '',
        },
      },
      {
        id: 'msg-2',
        content: 'Can you tell me more about his experience?',
        createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(), // 4 min ago
        sender: {
          id: '',
          name: '',
          avatarUrl: '',
        },
        receiver: {
          id: '',
          name: '',
          avatarUrl: '',
        },
      },
    ],
  },
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
