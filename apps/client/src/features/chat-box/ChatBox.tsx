import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/lib/ui/button';
import { Input } from '@/lib/ui/input';
import { useStore } from '@/stores';
import type { ChatMessageType } from '@/types/chat.types';
import { SOCKET_URL } from '@/utils/constants';
import {
  ChatCircleDotsIcon,
  PaperPlaneRightIcon,
  XIcon,
} from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import { useShallow } from 'zustand/shallow';

export const ChatBox = () => {
  const { isChatOpen, toggleModal, openChat, closeChat } = useStore(
    useShallow((state) => ({
      isChatOpen: state.isChatOpen,
      openChat: state.openChat,
      toggleModal: state.toggleModal,
      closeChat: state.closeChat,
    }))
  );

  const { user, isAuthenticated } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isChatOpen]);

  useEffect(() => {
    if (!isAuthenticated || socketRef.current) return;

    const socket = io(SOCKET_URL, {
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
    });

    socket.on('chat:history', (history) => {
      setMessages(history.reverse());
    });

    socket.on('chat:message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAuthenticated]);

  const handleSend = () => {
    if (!input.trim()) return;
    socketRef.current?.emit('chat:message', input);
    setInput('');
  };

  const handleIconClick = () => {
    if (isAuthenticated) {
      openChat();
    } else {
      toggleModal();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat bubble button */}
      <Button
        size="icon"
        variant="default"
        onClick={handleIconClick}
        className="rounded-full shadow-lg"
        aria-label="Toggle chat"
      >
        <ChatCircleDotsIcon size={24} />
      </Button>

      {/* Chat box */}
      {isChatOpen && isAuthenticated && (
        <div className="mt-2 w-80 rounded-xl shadow-xl bg-background border border-border">
          <div className="p-2 border-b border-border flex items-center justify-between">
            <span className="text-sm font-medium">Chat with Matteo</span>
            <Button variant="ghost" size="icon" onClick={closeChat}>
              <XIcon size={20} />
            </Button>
          </div>

          <div className="flex flex-col h-72 overflow-hidden">
            <div
              className="flex-1 overflow-y-auto p-2 space-y-3"
              ref={scrollRef}
            >
              {messages.map((msg, i) => {
                const isMe = msg.sender?.id === user?.id;
                const timestamp = new Date(msg.createdAt).toLocaleTimeString(
                  [],
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                );

                return (
                  <div
                    key={i}
                    className={`flex items-end gap-2 ${
                      isMe ? 'justify-end flex-row-reverse' : 'justify-start'
                    }`}
                  >
                    {/* Avatar */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-background shrink-0">
                        {msg.sender?.avatarUrl ? (
                          <img
                            src={msg.sender.avatarUrl}
                            alt={msg.sender.name}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                      <span className="text-[10px] text-foreground text-center max-w-[64px] truncate">
                        {isMe ? 'You' : (msg.sender?.name ?? 'Anonymous')}
                      </span>
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`rounded-xl p-3 max-w-[75%] text-sm shadow-elevation ${
                        isMe
                          ? 'bg-primary text-foreground rounded-br-none'
                          : 'bg-background text-foreground rounded-bl-none'
                      }`}
                    >
                      <div className="text-xs opacity-60 mb-1">{timestamp}</div>
                      <div>{msg.content}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex border-t border-border p-2 gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                placeholder="Type your message..."
              />
              <Button size="icon" type="submit">
                <PaperPlaneRightIcon size={20} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
