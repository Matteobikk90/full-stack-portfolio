// hooks/useChatSocket.ts
import { SOCKET_URL } from '@/utils/constants';
import { useEffect, useRef } from 'react';
import { io, type Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

export const useChatSocket = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (isLoading || !isAuthenticated || socketRef.current) return;

    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1];

    if (!accessToken) {
      console.warn('⚠️ No accessToken found');
      return;
    }

    const socket = io(SOCKET_URL, {
      auth: { token: accessToken },
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
    });

    socket.on('chat:message', (msg) => {
      console.log('📩 Received message:', msg);
    });

    socket.on('chat:history', (history) => {
      console.log('📚 History:', history);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAuthenticated, isLoading]);

  return socketRef;
};
