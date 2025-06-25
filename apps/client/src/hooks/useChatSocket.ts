import { useAuth } from '@/hooks/useAuth';
import type { ChatMessageType } from '@/types/chat.types';
import { SOCKET_URL } from '@/utils/constants';
import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

export const useChatSocket = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  const socketRef = useRef<Socket | null>(null);
  const activeUserIdRef = useRef<string | null>(null);

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [threads, setThreads] = useState<Record<string, ChatMessageType[]>>({});
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user?.id || socketRef.current) return;

    socketRef.current = io(SOCKET_URL, { withCredentials: true });

    socketRef.current.on('connect', () => {
      setIsConnecting(false);
      setConnectionError(null);
    });
    socketRef.current.on('connect_error', (err) => {
      setConnectionError('Failed to connect');
      console.error(err);
    });
    socketRef.current.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') socketRef.current?.connect();
    });

    socketRef.current.on('chat:history', (hist) => {
      setMessages(hist);

      if (!isAdmin && hist.length) {
        const adminId =
          hist[0].sender?.id === user?.id
            ? hist[0].receiver?.id
            : hist[0].sender?.id;
        activeUserIdRef.current = adminId;
        setActiveUserId(adminId);
      }
    });

    socketRef.current.on('chat:message', (msg: ChatMessageType) => {
      const otherId =
        msg.sender?.id === user.id ? msg.receiver?.id : msg.sender?.id;
      if (!otherId) return;

      setThreads((prev) => {
        const existing = prev[otherId] ?? [];
        const alreadyInThread = existing.some((m) => m.id === msg.id);
        if (alreadyInThread) return prev;

        const updated = { ...prev, [otherId]: [...existing, msg] };

        if (!isAdmin || activeUserIdRef.current === otherId) {
          setMessages((m) =>
            m.some((existing) => existing.id === msg.id) ? m : [...m, msg]
          );
        }

        return updated;
      });
    });

    socketRef.current.on('admin:all-conversations', setThreads);

    return () => {
      socketRef.current?.off();
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [isAuthenticated, user?.id, isAdmin]);

  const sendMessage = (text: string) => {
    return (
      socketRef.current?.connected &&
      socketRef.current.emit('chat:message', text.trim())
    );
  };

  const selectUser = (uid: string) => {
    const s = socketRef.current;
    if (!s) return;

    s.emit('admin:set-partner', uid, () => {
      activeUserIdRef.current = uid;
      setActiveUserId(uid);
      setMessages(threads[uid] || []);
    });
  };

  return {
    socket: socketRef.current,
    isConnecting,
    connectionError,
    messages,
    threads,
    activeUserId,
    setActiveUserId,
    sendMessage,
    selectUser,
  };
};

export type ReturnTypeChat = ReturnType<typeof useChatSocket>;
