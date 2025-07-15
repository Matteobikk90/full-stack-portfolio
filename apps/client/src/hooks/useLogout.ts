import api from '@/config/axios';
import { queryClient } from '@/config/queryClient';
import { toastDuration } from '@/utils/constants';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useLogout = () => {
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      queryClient.setQueryData(['me'], null);
      toast.success(t('toast.title'), {
        description: t('logout.success'),
        duration: toastDuration,
      });
    } catch (err) {
      toast.error(t('toast.title'), {
        description: t('logout.error'),
        duration: toastDuration,
      });
      console.error('Logout failed:', err);
    }
  };

  return { handleLogout };
};
