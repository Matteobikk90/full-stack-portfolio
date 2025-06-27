import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/stores';
import { useEffect } from 'react';

export const useChatSocket = (shouldConnect: boolean) => {
  const { isAuthenticated, user, isAdmin } = useAuth();
  const initSocket = useStore((s) => s.initSocket);

  useEffect(() => {
    if (shouldConnect && isAuthenticated && user?.id) {
      initSocket(user.id, isAdmin);
    }
  }, [isAuthenticated, user?.id, isAdmin, initSocket, shouldConnect]);
};
