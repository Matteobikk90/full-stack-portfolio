import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/stores';
import { useEffect } from 'react';

export const useChatSocket = () => {
  const { isAuthenticated, user, isAdmin } = useAuth();
  const initSocket = useStore((s) => s.initSocket);
  const disconnectSocket = useStore((s) => s.disconnectSocket);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      initSocket(user.id, isAdmin);
    } else {
      disconnectSocket();
    }
  }, [
    disconnectSocket,
    isAuthenticated,
    user?.id,
    isAdmin,
    initSocket,
  ]);
};
