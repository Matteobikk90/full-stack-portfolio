import PopUpInfo from '@/components/pop-up-info';
import { useChatSocket } from '@/hooks/useChatSocket';
import { Button } from '@/lib/ui/button';
import { cn } from '@/lib/utils';
import { useStore } from '@/stores';
import { XIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

export const Header = () => {
  const { isConnecting, connectionError, socket, isAdmin } = useChatSocket();
  const { closeChat } = useStore(
    useShallow(({ closeChat }) => ({ closeChat }))
  );
  const { t } = useTranslation();

  return (
    <div className="p-2 border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {isAdmin ? 'Admin Chat' : t('chat_me')}
        </span>
        <span
          className={cn(
            'w-2 h-2 rounded-full',
            isConnecting
              ? 'bg-experience animate-pulse'
              : socket?.connected
                ? 'bg-success'
                : connectionError
                  ? 'bg-error'
                  : 'hidden'
          )}
        />
      </div>
      <Button variant="outline" size="icon" onClick={closeChat}>
        <PopUpInfo hoverText={t('close_chat')} align="left">
          <XIcon className="size-5" weight="duotone" />
        </PopUpInfo>
      </Button>
    </div>
  );
};
