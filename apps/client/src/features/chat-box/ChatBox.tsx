import { Header } from '@/features/chat-box/Header';
import { Messages } from '@/features/chat-box/Messages';
import { Tabs } from '@/features/chat-box/Tabs';
import { useAuth } from '@/hooks/useAuth';
import { useChatSocket } from '@/hooks/useChatSocket';
import { useStore } from '@/stores';
import { useShallow } from 'zustand/shallow';

export const ChatBox = () => {
  const { isChatOpen, chatMode } = useStore(
    useShallow(({ isChatOpen, chatMode }) => ({ isChatOpen, chatMode }))
  );

  const { isAuthenticated, isAdmin } = useAuth();
  const { activeUserId, threads, selectUser, messages, socket, sendMessage } =
    useChatSocket();

  if (!isChatOpen || !isAuthenticated) return null;

  return (
    <aside className="fixed bottom-22 right-0 z-11 w-96 rounded-l-md shadow-xl bg-background border">
      <Header />
      {chatMode === 'admin' && isAdmin && (
        <Tabs
          threads={threads}
          selectUser={selectUser}
          activeUserId={activeUserId}
        />
      )}
      <Messages
        messages={messages}
        socket={socket}
        activeUserId={activeUserId}
        sendMessage={sendMessage}
      />
    </aside>
  );
};
