import PopUpInfo from '@/components/pop-up-info';
import { useChatSocket } from '@/hooks/useChatSocket';
import { Button } from '@/lib/ui/button';
import { cn } from '@/lib/utils';
import { useStore } from '@/stores';
import { XIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

export const Header = () => {
  const { isConnecting, connectionError, socket } = useChatSocket();
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
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          className={cn(chatMode === 'admin' && 'bg-secondary text-white')}
          onClick={() => setChatMode('admin')}
        >
          {t('chat_me')}
        </Button>
        <Button
          className={cn(chatMode === 'ai' && 'bg-secondary text-white')}
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
      <Button variant="outline" size="icon" onClick={closeChat}>
        <PopUpInfo hoverText={t('close_chat')} align="left">
          <XIcon className="size-5" weight="duotone" />
        </PopUpInfo>
      </Button>
    </div>
  );
};
