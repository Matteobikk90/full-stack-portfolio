import { Header } from '@/features/chat-box/Header';
import { Messages } from '@/features/chat-box/Messages';
import { Tabs } from '@/features/chat-box/Tabs';
import { useChatSocket } from '@/hooks/useChatSocket';
import { useStore } from '@/stores';
import { useShallow } from 'zustand/shallow';

export const ChatBox = () => {
  const { isChatOpen } = useStore(
    useShallow(({ isChatOpen, closeChat }) => ({ isChatOpen, closeChat }))
  );
  const { isAdmin } = useChatSocket();

  if (!isChatOpen) return null;

  return (
    <aside className="fixed bottom-16 right-0 z-11 w-96">
      <div className="rounded-l-md shadow-xl bg-background border">
        <Header />
        {isAdmin && <Tabs />}
        <Messages />
      </div>
    </aside>
  );
};
