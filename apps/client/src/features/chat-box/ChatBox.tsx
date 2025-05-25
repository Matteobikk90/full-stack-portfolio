import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/lib/ui/button';
import { Input } from '@/lib/ui/input';
import { cn } from '@/lib/utils';
import { useStore } from '@/stores';
import type { ChatMessageType } from '@/types/chat.types';
import { SOCKET_URL } from '@/utils/constants';
import { chartDimensions } from '@/utils/form';
import { ChatsIcon, PaperPlaneRightIcon, XIcon } from '@phosphor-icons/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import { useShallow } from 'zustand/shallow';

const ANIMATION_CLASSES = {
  pulse: 'animate-pulse-slow',
  shadow: 'shadow-elevation',
} as const;

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
  const [input, setInput] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sortedMessages = useMemo(() => {
    return [...messages].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();

    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [sortedMessages, isChatOpen, scrollToBottom]);

  useEffect(() => {
    if (!isAuthenticated || socketRef.current) return;

    setIsConnecting(true);
    setConnectionError(null);

    const socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      timeout: 10000,
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

    socket.on('chat:history', (history: ChatMessageType[]) => {
      setMessages(history);
    });

    socket.on('chat:message', (msg: ChatMessageType) => {
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

    socketRef.current.emit('chat:message', trimmedInput);
    setInput('');

    inputRef.current?.focus();
  }, [input]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleIconClick = useCallback(() => {
    if (isAuthenticated) {
      openChat();
    } else {
      toggleModal();
    }
  }, [isAuthenticated, openChat, toggleModal]);

  const renderMessage = useCallback(
    (msg: ChatMessageType, index: number) => {
      const isMe = msg.sender?.id === user?.id;
      const timestamp = new Date(msg.createdAt).toLocaleTimeString([], {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

      return (
        <div
          key={index}
          className={cn(
            'flex items-end gap-2 animate-in fade-in-0 slide-in-from-bottom-2 justify-start',
            isMe ? 'flex-row-reverse' : ''
          )}
        >
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            {msg.sender?.avatarUrl ? (
              <img
                width={30}
                height={30}
                src={msg.sender.avatarUrl}
                alt={`${msg.sender.name}'s avatar`}
                className="object-cover rounded-full ring-2 ring-border"
                loading="lazy"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg flex items-center justify-center text-xs font-medium">
                {msg.sender?.name?.charAt(0).toUpperCase() || '?'}
              </div>
            )}
          </div>

          <div
            className={cn(
              'rounded-xl p-3 max-w-[75%] text-sm shadow-elevation',
              isMe
                ? 'bg-background text-foreground rounded-br-none'
                : 'bg text-foreground rounded-bl-none'
            )}
          >
            <div className="text-xs mb-1 flex gap-1">
              <span className="font-medium max-w-24 truncate">
                {isMe ? 'You' : msg.sender?.name || 'Unknown'}
              </span>
              <span>•</span>
              <time dateTime={msg.createdAt}>{timestamp}</time>
            </div>
            <div>{msg.content}</div>
          </div>
        </div>
      );
    },
    [user?.id]
  );

  return (
    <aside className="fixed bottom-6 right-6 z-50">
      {!isChatOpen && (
        <Button
          variant="outline"
          onClick={handleIconClick}
          className={cn(
            'rounded-full',
            chartDimensions.buttonSize,
            ANIMATION_CLASSES.shadow,
            ANIMATION_CLASSES.pulse,
            'hover:scale-105 transition-transform'
          )}
          aria-label={isAuthenticated ? 'Open chat' : 'Sign in to chat'}
        >
          <ChatsIcon size={24} weight="duotone" />
        </Button>
      )}

      {isChatOpen && isAuthenticated && (
        <div
          className={cn(
            'rounded-xl shadow-xl bg-background border',
            chartDimensions.width
          )}
        >
          <div className="p-3 border-b flex items-center justify-between">
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
            <Button
              variant="outline"
              size="icon"
              onClick={closeChat}
              aria-label="Close chat"
            >
              <XIcon size={16} />
            </Button>
          </div>

          <div
            className={cn(
              'flex flex-col overflow-hidden',
              chartDimensions.height
            )}
          >
            <div
              className="flex-1 overflow-y-auto p-3 space-y-3"
              ref={scrollRef}
            >
              {connectionError && (
                <div className="text-center p-4 text-sm text-foreground bg-error rounded-lg">
                  {connectionError}
                </div>
              )}

              {sortedMessages.length === 0 &&
                !isConnecting &&
                !connectionError && (
                  <div className="text-center p-4 text-sm text-foreground">
                    No messages yet. Start the conversation!
                  </div>
                )}

              {sortedMessages.map(renderMessage)}

              {isConnecting && (
                <div className="text-center p-4 text-sm text-foreground">
                  Connecting to chat...
                </div>
              )}
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
                size="sm"
                type="submit"
                disabled={!input.trim() || !socketRef.current?.connected}
                aria-label="Send message"
              >
                <PaperPlaneRightIcon size={16} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};
