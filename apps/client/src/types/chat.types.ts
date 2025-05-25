type MessageStatus = 'sent' | 'delivered' | 'seen';

export type ChatSliceType = {
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
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
  status?: MessageStatus;
};
