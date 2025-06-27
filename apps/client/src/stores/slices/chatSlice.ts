import type { ChatSliceType } from '@/types/chat.types';
import { SOCKET_URL } from '@/utils/constants';
import { io } from 'socket.io-client';
import type { StateCreator } from 'zustand';

const createChatSlice: StateCreator<ChatSliceType> = (set, get) => ({
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
          (msg) =>
            now - new Date(msg.createdAt).getTime() < 10 * 24 * 60 * 60 * 1000 // 10 days
        ),
      ])
    );
    set({ aiMessages: updated });
  },

  chatMessages: {},
  setChatMessages: (userId, update) =>
    set((state) => ({
      chatMessages: {
        ...state.chatMessages,
        [userId]:
          typeof update === 'function'
            ? update(state.chatMessages[userId] ?? [])
            : update,
      },
    })),

  threads: {},
  activeUserId: null,

  socket: null,
  isConnecting: true,
  connectionError: null,
  selectUser: (uid) => {
    const { socket, threads, setChatMessages } = get();
    if (!socket) return;

    socket.emit('admin:set-partner', uid, () => {
      set({ activeUserId: uid });
      setChatMessages(uid, threads[uid] || []);
    });
  },
  initSocket: (userId, isAdmin) => {
    const socket = io(SOCKET_URL, { withCredentials: true });

    set({ socket, isConnecting: true, connectionError: null });

    socket.on('connect', () => {
      set({ isConnecting: false, connectionError: null });
    });

    socket.on('connect_error', (err) => {
      console.error(err);
      set({ connectionError: 'Failed to connect', isConnecting: false });
    });

    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') socket.connect();
    });

    socket.on('chat:history', (hist) => {
      console.log('ghj');
      if (!isAdmin && hist.length) {
        const adminId =
          hist[0].sender?.id === userId
            ? hist[0].receiver?.id
            : hist[0].sender?.id;
        set({
          activeUserId: adminId,
        });
        get().setChatMessages(adminId, hist);
      }
    });

    socket.on('chat:message', (msg) => {
      const otherId =
        msg.sender?.id === userId ? msg.receiver?.id : msg.sender?.id;
      if (!otherId) return;

      const threads = get().threads;
      const existing = threads[otherId] ?? [];
      const alreadyInThread = existing.some((m) => m.id === msg.id);
      if (alreadyInThread) return;

      const updated = { ...threads, [otherId]: [...existing, msg] };
      set({ threads: updated });

      if (!isAdmin || get().activeUserId === otherId) {
        get().setChatMessages(otherId, (prev) =>
          prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]
        );
      }
    });

    socket.on('chat:init', ({ adminId }) => {
      if (!get().activeUserId) {
        set({ activeUserId: adminId });
      }
    });

    socket.on('admin:all-conversations', (allThreads) => {
      set({ threads: allThreads });
      if (isAdmin && Object.keys(allThreads).length) {
        const firstUserId = Object.keys(allThreads)[0];
        set({ activeUserId: firstUserId });
        get().setChatMessages(firstUserId, allThreads[firstUserId]);
      }
    });
  },
});

export default createChatSlice;
