import { cn } from '@/lib/utils';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import type { ReactNode } from 'react';

interface ScrollContainerProps {
  children: ReactNode;
  className?: string;
  type?: 'auto' | 'always';
  backgroundColor?: string;
}

export const ScrollContainer = ({
  children,
  className,
  type = 'auto',
  backgroundColor = 'bg-secondary',
}: ScrollContainerProps) => (
  <ScrollArea.Root type={type} className={cn('relative w-full', className)}>
    <ScrollArea.Viewport className="w-full h-full">
      {children}
    </ScrollArea.Viewport>

    <ScrollArea.Scrollbar
      orientation="vertical"
      className="w-2 absolute !-right-2"
    >
      <ScrollArea.Thumb
        className={cn(backgroundColor, 'flex-1 rounded-full')}
      />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
);
