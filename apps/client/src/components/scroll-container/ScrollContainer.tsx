import { cn } from '@/lib/utils';
import type { ScrollContainerTypes } from '@/types/scroll-container.types';
import * as ScrollArea from '@radix-ui/react-scroll-area';

export const ScrollContainer = ({
  children,
  className,
  type = 'auto',
  backgroundColor = 'bg-secondary',
}: ScrollContainerTypes) => (
  <ScrollArea.Root
    type={type}
    className={cn('relative w-full flex', className)}
  >
    <ScrollArea.Viewport className="w-full h-full">
      {children}
    </ScrollArea.Viewport>

    <ScrollArea.Scrollbar
      orientation="vertical"
      className="w-2 !-right-2 !relative"
    >
      <ScrollArea.Thumb className={cn(backgroundColor, 'rounded-full')} />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
);
