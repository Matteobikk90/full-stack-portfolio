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
};

export type ChatMessageType = {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  receiver: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  status?: MessageStatus;
};
