import { useAuth } from '@/hooks/useAuth';
import type { ReturnTypeChat } from '@/hooks/useChatSocket';
import { Button } from '@/lib/ui/button';
import { cn } from '@/lib/utils';

export const Tabs = ({
  threads,
  selectUser,
  activeUserId,
}: Pick<ReturnTypeChat, 'threads' | 'selectUser' | 'activeUserId'>) => {
  const { user } = useAuth();

  return (
    <div className="border-b overflow-x-auto p-2 whitespace-nowrap flex gap-2">
      {Object.entries(threads).map(([uid, msgs]) => {
        const other =
          msgs[0]?.sender?.id === user.id ? msgs[0]?.receiver : msgs[0]?.sender;

        return (
          <Button
            key={uid}
            onClick={() => selectUser(uid)}
            className={cn(activeUserId === uid && 'bg-secondary text-white')}
          >
            {other?.name || 'User'}
          </Button>
        );
      })}
    </div>
  );
};
