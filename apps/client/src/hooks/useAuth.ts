import api from '@/config/axios';
import { adminEmail } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await api.get('/auth/me');
      return data;
    },
  });
  const isAdmin = useMemo(() => data?.email === adminEmail, [data?.email]);

  return {
    user: data,
    isAuthenticated: !!data,
    isLoading,
    isError,
    isAdmin,
  };
};
