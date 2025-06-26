import PopUpInfo from '@/components/pop-up-info';
import { useAuth } from '@/hooks/useAuth';
import { useChatSocket } from '@/hooks/useChatSocket';
import { Button } from '@/lib/ui/button';
import { cn } from '@/lib/utils';
import { useStore } from '@/stores';
import { InfoIcon, XIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

export const Header = () => {
  const { isConnecting, connectionError, socket } = useChatSocket();
  const { isAdmin } = useAuth();
  const { closeChat, chatMode, setChatMode } = useStore(
    useShallow(({ closeChat, chatMode, setChatMode }) => ({
      closeChat,
      chatMode,
      setChatMode,
    }))
  );
  const { t } = useTranslation();

  return (
    <div className="p-2 border-b flex items-center justify-between">
      {isAdmin ? (
        <h3 className="font-medium">Admin</h3>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className={cn(
              chatMode === 'admin' &&
                'bg-primary hover:bg-primary focus:bg-primary text-white shadow-none'
            )}
            onClick={() => setChatMode('admin')}
          >
            {t('chat_me')}
          </Button>
          <Button
            className={cn(
              chatMode === 'ai' &&
                'bg-primary hover:bg-primary focus:bg-primary text-white shadow-none'
            )}
            size="sm"
            onClick={() => setChatMode('ai')}
          >
            Ask AI
          </Button>
          <span
            className={cn(
              'w-3 h-3 rounded-full',
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
      )}

      <div>
        <Button variant="ghost">
          <PopUpInfo
            hoverText={t('cancel_policy')}
            align="left"
            className="gap-2"
            wrapText
          >
            <InfoIcon weight="duotone" className="size-5" />
          </PopUpInfo>
        </Button>
        <Button variant="outline" size="icon" onClick={closeChat}>
          <PopUpInfo hoverText={t('close_chat')} align="left">
            <XIcon className="size-5" weight="duotone" />
          </PopUpInfo>
        </Button>
      </div>
    </div>
  );
};
