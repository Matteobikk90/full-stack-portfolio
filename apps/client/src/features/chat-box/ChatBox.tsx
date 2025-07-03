import { Header } from '@/features/chat-box/Header';
import { Messages } from '@/features/chat-box/Messages';
import { Tabs } from '@/features/chat-box/Tabs';
import { useAuth } from '@/hooks/useAuth';
import { useChatSocket } from '@/hooks/useChatSocket';
import { cn } from '@/lib/utils';
import { useStore } from '@/stores';
import { useShallow } from 'zustand/shallow';

export const ChatBox = () => {
  const { isChatOpen, chatMode } = useStore(
    useShallow(({ isChatOpen, chatMode }) => ({ isChatOpen, chatMode }))
  );

  const { isAuthenticated, isAdmin } = useAuth();

  useChatSocket(isChatOpen && isAuthenticated);

  return isAuthenticated ? (
    <aside
      className={cn(
        'fixed bottom-22 right-0 z-50 w-96 rounded-l-md shadow-xl bg-background border transition-transform duration-300 ease-in-out',
        isChatOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <Header />
      {chatMode === 'admin' && isAdmin && <Tabs />}
      <Messages />
    </aside>
  ) : null;
};
