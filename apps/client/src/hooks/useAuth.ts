import api from '@/config/axios';
import { adminEmails } from '@/utils/constants';
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
  const isAdmin = useMemo(
    () => adminEmails.includes(data?.email),
    [data?.email]
  );
  console.log({ data });
  console.log(!!data?.email);
  console.log(!!data);

  return {
    user: data,
    isAuthenticated: !!data?.email,
    isLoading,
    isError,
    isAdmin,
  };
};
