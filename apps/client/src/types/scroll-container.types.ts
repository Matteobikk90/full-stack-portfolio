import type { ReactNode } from 'react';

export type ScrollContainerTypes = {
  children: ReactNode;
  className?: string;
  type?: 'auto' | 'always';
  backgroundColor?: string;
};
