import { useStore } from '@/stores';
import { useEffect } from 'react';

export const useClearOldAiMessages = () => {
  const clearOldAiMessages = useStore((s) => s.clearOldAiMessages);

  useEffect(() => {
    clearOldAiMessages();
    const interval = setInterval(clearOldAiMessages, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [clearOldAiMessages]);
};
