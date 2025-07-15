import api from '@/config/axios';
import { adminEmails, virtualAdminId } from '@/utils/constants';
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

  const normalizedUser = useMemo(() => {
    console.log({ data });
    console.log({ isError });
    if (!data || isError) return null;
    return {
      ...data,
      id: isAdmin ? virtualAdminId : data.id,
    };
  }, [data, isAdmin, isError]);

  return {
    user: normalizedUser,
    isAuthenticated: !!normalizedUser,
    isLoading,
    isError,
    isAdmin,
  };
};
