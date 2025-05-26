import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/lib/ui/button';
import { Input } from '@/lib/ui/input';
import { cn } from '@/lib/utils';
import { useStore } from '@/stores';
import type { ChatMessageType } from '@/types/chat.types';
import { SOCKET_URL } from '@/utils/constants';
import { ChatsIcon, PaperPlaneRightIcon, XIcon } from '@phosphor-icons/react';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });

    if (isChatOpen) inputRef.current?.focus();
  }, [messages, isChatOpen]);

  useEffect(() => {
    if (!isAuthenticated || socketRef.current) return;
    setIsConnecting(true);
    setConnectionError(null);

    const socket = io(SOCKET_URL, {
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
      setIsConnecting(false);
      setConnectionError(null);
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error);
      setIsConnecting(false);
      setConnectionError('Failed to connect to chat server');
    });

    socket.on('disconnect', (reason) => {
      console.log('🔌 Socket disconnected:', reason);
      if (reason === 'io server disconnect') {
        socket.connect();
      }
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
      setIsConnecting(false);
    };
  }, [isAuthenticated]);

  const handleSend = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput || !socketRef.current?.connected) return;

    const tempMsg = {
      id: `temp-${Date.now()}`,
      content: trimmedInput,
      createdAt: new Date().toISOString(),
      sender: { ...user },
    };

    setMessages((prev) => [...prev, tempMsg]);
    socketRef.current.emit('chat:message', trimmedInput);
    setInput('');
    inputRef.current?.focus();
  }, [input, user]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleIconClick = () => (isAuthenticated ? openChat() : toggleModal());

  return (
    <aside className="fixed bottom-6 right-6 z-10">
      {!isChatOpen && (
        <Button
          variant="outline"
          onClick={handleIconClick}
          className="rounded-full shadow-elevation w-12 h-12 animate-pulse-slow"
          aria-label="Toggle chat"
        >
          <ChatsIcon size={32} weight="duotone" />
        </Button>
      )}

      {isChatOpen && isAuthenticated && (
        <div className="mt-2 w-80 rounded-xl shadow-xl bg-background border">
          <div className="p-2 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Chat with Matteo</span>
              <span
                className={cn(
                  'w-2 h-2  rounded-full ',
                  isConnecting
                    ? 'bg-experience animate-pulse'
                    : socketRef.current?.connected && !isConnecting
                      ? 'bg-success'
                      : connectionError
                        ? 'bg-error'
                        : 'hidden'
                )}
              />
            </div>
            <Button variant="outline" size="icon" onClick={closeChat}>
              <XIcon size={20} weight="duotone" />
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
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                );

                return (
                  <div
                    key={i}
                    className={cn(
                      'flex items-end gap-2',
                      isMe ? 'justify-start flex-row-reverse' : 'justify-start'
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {msg.sender?.avatarUrl ? (
                        <img
                          width={30}
                          height={30}
                          src={msg.sender.avatarUrl}
                          alt={msg.sender.name}
                          className="object-cover rounded-full"
                        />
                      ) : null}
                    </div>

                    <div
                      className={`rounded-xl p-3 max-w-[75%] text-sm shadow-elevation ${
                        isMe
                          ? 'bg-primary text-foreground rounded-br-none'
                          : 'bg-background text-foreground rounded-bl-none'
                      }`}
                    >
                      <div className="text-xs mb-1 flex gap-1">
                        <strong className="max-w-24 truncate">
                          {isMe ? 'You' : msg.sender?.name || 'Unknown'}
                        </strong>
                        <span>•</span>
                        <time dateTime={msg.createdAt}>{timestamp}</time>
                      </div>
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
              className="flex border-t p-3 gap-2"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
                placeholder="Type your message..."
                disabled={!socketRef.current?.connected}
                maxLength={350}
              />
              <Button
                variant="outline"
                size="icon"
                type="submit"
                disabled={!input.trim() || !socketRef.current?.connected}
                aria-label="Send message"
              >
                <PaperPlaneRightIcon size={20} weight="duotone" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};
