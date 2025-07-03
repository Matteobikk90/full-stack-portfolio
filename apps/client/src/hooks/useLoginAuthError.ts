import { toastDuration } from '@/utils/constants';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useLoginErrorToast = () => {
  const navigate = useNavigate();
  const { reason }: { reason: string } = useSearch({ from: '/' });
  const { t } = useTranslation();

  useEffect(() => {
    if (reason === 'oauth-failed') {
      toast.error(t('toast.title'), {
        description: t('login_error'),
        duration: toastDuration,
      });
      navigate({ to: '/', replace: true });
    }
  }, [t, reason, navigate]);
};
