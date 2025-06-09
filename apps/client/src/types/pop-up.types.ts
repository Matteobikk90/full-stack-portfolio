import type { ReactNode } from 'react';

export type PopUpInfoType = {
  children: ReactNode;
  hoverText: string;
  position?: 'top' | 'bottom';
  align?: 'left' | 'center' | 'right';
  showOnClick?: boolean;
  className?: string;
  wrapText?: boolean;
};
