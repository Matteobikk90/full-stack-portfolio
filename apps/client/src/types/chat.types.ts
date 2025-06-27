import type { JSX } from 'react';
import { type Socket } from 'socket.io-client';

type MessageStatus = 'sent' | 'delivered' | 'seen';

export type ChatSliceType = {
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;

  chatMode: 'admin' | 'ai';
  setChatMode: (mode: 'admin' | 'ai') => void;

  aiMessages: Record<string, ChatMessageType[]>;
  setAiMessages: (
    userId: string,
    updater:
      | ChatMessageType[]
      | ((prev: ChatMessageType[]) => ChatMessageType[])
  ) => void;
  clearOldAiMessages: () => void;

  chatMessages: Record<string, ChatMessageType[]>;
  setChatMessages: (
    userId: string,
    updater:
      | ChatMessageType[]
      | ((prev: ChatMessageType[]) => ChatMessageType[])
  ) => void;

  socket: Socket | null;
  isConnecting: boolean;
  connectionError: string | null;
  threads: Record<string, ChatMessageType[]>;
  activeUserId: string | null;
  selectUser: (userId: string) => void;
  initSocket: (userId: string, isAdmin: boolean) => void;
};

export type ChatMessageType = {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    avatarUrl: string | JSX.Element | null;
  };
  receiver: {
    id: string;
    name: string;
    avatarUrl: string | JSX.Element | null;
  };
  status?: MessageStatus;
};
