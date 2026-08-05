import { apiGet } from '@/utils/api';
import { adminEmails, virtualAdminId } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

type AuthUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  [key: string]: unknown;
};

export const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['me'],
    queryFn: () => apiGet<AuthUser | null>('/auth/me'),
  });
  const isAdmin = useMemo(
    () => !!data?.email && adminEmails.includes(data.email),
    [data?.email]
  );

  const normalizedUser = useMemo(() => {
    if (!data || isError) return null;
    return {
      ...data,
      id: isAdmin ? virtualAdminId : data.id,
      avatarUrl: null,
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
