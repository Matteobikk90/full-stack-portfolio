import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('accessToken');
    if (stored) setAccessToken(stored);
  }, []);

  const isLoggedIn = !!accessToken;

  return { isLoggedIn, accessToken };
};
