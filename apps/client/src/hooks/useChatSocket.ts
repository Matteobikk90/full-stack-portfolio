// hooks/useChatSocket.ts
import { useAuth } from '@/hooks/useAuth';
import type { ChatMessageType } from '@/types/chat.types';
import { adminEmail, SOCKET_URL } from '@/utils/constants';
import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

export const useChatSocket = () => {
  const { user, isAuthenticated } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [threads, setThreads] = useState<Record<string, ChatMessageType[]>>({});
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const isAdmin = user?.email === adminEmail;

  useEffect(() => {
    if (!isAuthenticated || socketRef.current) return;

    setIsConnecting(true);
    const socket = io(SOCKET_URL, { withCredentials: true });
    socketRef.current = socket;

    const onConnect = () => {
      setIsConnecting(false);
      setConnectionError(null);
    };

    const onConnectError = (error: Error) => {
      setIsConnecting(false);
      setConnectionError('Failed to connect');
      console.error('❌ Socket error:', error);
    };

    const onDisconnect = (reason: string) => {
      console.log('🔌 Socket disconnected:', reason);
      if (reason === 'io server disconnect') socket.connect();
    };

    const onChatHistory = (history: ChatMessageType[]) => {
      setMessages(history);
    };

    const onChatMessage = (msg: ChatMessageType) => {
      setMessages((prev) => {
        const exists = prev.some((m) => m.id === msg.id);
        return exists ? prev : [...prev, msg];
      });
    };

    socket.on('connect', onConnect);
    socket.on('connect_error', onConnectError);
    socket.on('disconnect', onDisconnect);
    socket.on('chat:history', onChatHistory);
    socket.on('chat:message', onChatMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('connect_error', onConnectError);
      socket.off('disconnect', onDisconnect);
      socket.off('chat:history', onChatHistory);
      socket.off('chat:message', onChatMessage);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAuthenticated, isAdmin, user?.id]);

  useEffect(() => {
    if (!isAdmin || !socketRef.current) return;

    const socket = socketRef.current;

    const onAdminNewMessage = (msg: ChatMessageType) => {
      const other = msg.sender?.id === user?.id ? msg.receiver : msg.sender;
      if (!other) return;

      setThreads((prev) => {
        const updated = { ...prev };
        if (!updated[other.id]) updated[other.id] = [];
        updated[other.id] = [...updated[other.id], msg];
        return updated;
      });

      if (!activeUserId) {
        setActiveUserId(msg.sender.id);
        socket.emit('admin:set-partner', msg.sender.id);
        setMessages([msg]);
      }
    };

    socket.on('admin:new-message', onAdminNewMessage);
    return () => {
      socket.off('admin:new-message', onAdminNewMessage);
    };
  }, [isAdmin, user?.id, activeUserId]);

  const sendMessage = (content: string) => {
    if (!socketRef.current?.connected) return;
    socketRef.current.emit('chat:message', content.trim());
  };

  const selectUser = (uid: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit('admin:set-partner', uid);
    setActiveUserId(uid);
    setMessages(threads[uid] || []);
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
    isAdmin,
  };
};
