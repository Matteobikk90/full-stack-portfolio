import api from '@/config/axios';
import { queryClient } from '@/config/queryClient';

export const useLogout = () => {
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      queryClient.invalidateQueries({ queryKey: ['me'] });
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return { handleLogout };
};
