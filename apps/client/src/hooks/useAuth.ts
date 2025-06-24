import api from '@/config/axios';
import { adminEmail } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await api.get('/auth/me');
      return data;
    },
  });
  const isAdmin = data?.email === adminEmail;

  return {
    user: data,
    isAuthenticated: !!data,
    isLoading: isLoading,
    isError: isError,
    isAdmin,
  };
};
