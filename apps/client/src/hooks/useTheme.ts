import { useStore } from '@/stores';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export const useTheme = () => {
  const { mode, updateBackground } = useStore(
    useShallow((state) => ({
      mode: state.mode,
      updateBackground: state.updateBackground,
    }))
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(mode);

    requestAnimationFrame(() => {
      updateBackground();
    });
  }, [mode, updateBackground]);
};
