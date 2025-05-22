import api from '@/config/axios';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const query = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await api.get('/auth/me');
      return data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    user: query.data,
    isAuthenticated: !!query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
