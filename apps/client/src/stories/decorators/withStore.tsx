import { useStore } from '@/stores';
import { getCSSVariable } from '@/utils/particles';
import type { ReactNode } from 'react';

export const withStore = (Story: () => ReactNode) => {
  useStore.setState({
    mode: 'light' as 'light' | 'dark',
    background: getCSSVariable('--foreground'),
    toggle: () => useStore.setState({ mode: 'dark' }),
    updateBackground: () =>
      useStore.setState({
        background: getCSSVariable('--background'),
      }),
  });

  return <Story />;
};
