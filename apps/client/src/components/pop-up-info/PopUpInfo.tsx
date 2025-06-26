import { cn } from '@/lib/utils';
import { type PopUpInfoType } from '@/types/pop-up.types';

const commonClasses =
  'absolute z-12 rounded-md text-xs p-2 bg-foreground text-background shadow-elevation text-center';

export const PopUpInfo = ({
  children,
  hoverText,
  position = 'top',
  align = 'center',
  className,
  wrapText = false,
}: PopUpInfoType) => {
  const positionClasses =
    position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';

  const alignClasses = {
    center: 'left-1/2 transform -translate-x-1/2',
    left: 'right-0',
    right: 'left-0',
  };

  return (
    <div className={cn('relative flex items-center group/actions', className)}>
      {children}

      {hoverText && (
        <div
          className={cn(
            'hidden group-hover/actions:block',
            commonClasses,
            positionClasses,
            alignClasses[align],
            wrapText
              ? 'max-w-[16.4rem] w-max whitespace-pre-line'
              : 'whitespace-nowrap'
          )}
        >
          {hoverText}
        </div>
      )}
    </div>
  );
};
