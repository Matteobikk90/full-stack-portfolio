import PopUpInfo from '@/components/pop-up-info';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/lib/ui/button';
import { Input } from '@/lib/ui/input';
import { cn } from '@/lib/utils';
import { useStore } from '@/stores';
import type { ChatMessageType } from '@/types/chat.types';
import { adminEmail, SOCKET_URL } from '@/utils/constants';
import { PaperPlaneRightIcon, XIcon } from '@phosphor-icons/react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { io, type Socket } from 'socket.io-client';
import { useShallow } from 'zustand/shallow';

export const ChatBox = () => {
  const { isChatOpen, closeChat } = useStore(
    useShallow(({ isChatOpen, openChat, toggleModal, closeChat }) => ({
      isChatOpen,
      openChat,
      toggleModal,
      closeChat,
    }))
  );
  const { user, isAuthenticated } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [threads, setThreads] = useState<Record<string, ChatMessageType[]>>({});
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  const isAdmin = user?.email === adminEmail;

  useLayoutEffect(() => {
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

    const socket = io(SOCKET_URL, { withCredentials: true });
    socketRef.current = socket;

    socket.on('connect', () => {
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
      if (reason === 'io server disconnect') socket.connect();
    });

    if (isAdmin) {
      socket.on('admin:new-message', (msg) => {
        setThreads((prev) => {
          const other = msg.sender?.id === user?.id ? msg.receiver : msg.sender;
          if (!other) return prev;

          const updated = { ...prev };
          if (!updated[other.id]) updated[other.id] = [];
          updated[other.id] = [...(updated[other.id] || []), msg];

          return updated;
        });

        if (!activeUserId) {
          setActiveUserId(msg.sender.id);
          socket.emit('admin:set-partner', msg.sender.id);
          setMessages([msg]);
        }
      });
    }

    socket.on('chat:message', (msg) => {
      setMessages((prev) => {
        const exists = prev.some((m) => m.id === msg.id);
        return exists ? prev : [...prev, msg];
      });
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsConnecting(false);
    };
  }, [isAuthenticated, isAdmin, activeUserId, user?.id]);

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

  const handleSelectUser = (userId: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit('admin:set-partner', userId);
    setActiveUserId(userId);
    setMessages(threads[userId] || []);
  };

  return (
    <aside className="fixed bottom-16 lg:bottom-20 -right-0.5 rounded-md z-11">
      {isChatOpen && isAuthenticated && (
        <div className="mt-2 max-w-96 rounded-bl-md rounded-tl-md shadow-xl bg-background border">
          <div className="p-2 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {isAdmin ? 'Admin Chat' : 'Chat with Matteo'}
              </span>
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
              <PopUpInfo hoverText="Close chat" align="left">
                <XIcon className="size-5" weight="duotone" />
              </PopUpInfo>
            </Button>
          </div>

          {isAdmin && (
            <div className="border-b overflow-x-auto p-2 whitespace-nowrap">
              {Object.entries(threads).map(([uid, msgs]) => {
                const other =
                  msgs[0]?.sender?.id === user?.id
                    ? msgs[0]?.receiver
                    : msgs[0]?.sender;
                return (
                  <Button
                    key={uid}
                    onClick={() => handleSelectUser(uid)}
                    className={cn(
                      'px-3 py-1 rounded-md text-sm mr-2',
                      activeUserId === uid
                        ? 'bg-primary text-white'
                        : 'bg-muted'
                    )}
                  >
                    {other?.name || 'User'}
                  </Button>
                );
              })}
            </div>
          )}

          <div className="flex flex-col h-72 overflow-hidden">
            <div
              className="flex-1 overflow-y-auto p-2 space-y-3"
              ref={scrollRef}
            >
              {messages.map((msg) => {
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
                    key={msg.id}
                    className={cn(
                      'flex items-end gap-2',
                      isMe ? 'justify-start flex-row-reverse' : 'justify-start'
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {msg.sender?.avatarUrl && (
                        <img
                          width={30}
                          height={30}
                          src={msg.sender.avatarUrl}
                          alt={msg.sender.name}
                          className="object-cover rounded-full"
                        />
                      )}
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
                disabled={
                  !socketRef.current?.connected || (isAdmin && !activeUserId)
                }
                maxLength={350}
              />
              <Button
                variant="outline"
                size="icon"
                type="submit"
                disabled={
                  !input.trim() ||
                  !socketRef.current?.connected ||
                  isConnecting ||
                  (isAdmin && !activeUserId)
                }
                aria-label="Send message"
              >
                <PopUpInfo hoverText="Send message" align="left">
                  <PaperPlaneRightIcon className="size-5" weight="duotone" />
                </PopUpInfo>
              </Button>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};
