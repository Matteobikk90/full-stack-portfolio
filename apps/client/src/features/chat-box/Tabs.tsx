import { useAuth } from '@/hooks/useAuth';
import { useChatSocket } from '@/hooks/useChatSocket';
import { Button } from '@/lib/ui/button';
import { cn } from '@/lib/utils';

export const Tabs = () => {
  const { threads, selectUser, activeUserId } = useChatSocket();
  const { user } = useAuth();

  return (
    <div className="border-b overflow-x-auto p-2 whitespace-nowrap">
      {Object.entries(threads).map(([uid, msgs]) => {
        const other =
          msgs[0]?.sender?.id === user.id ? msgs[0]?.receiver : msgs[0]?.sender;
        return (
          <Button
            key={uid}
            onClick={() => selectUser(uid)}
            className={cn(
              'px-3 py-1 rounded-md text-sm mr-2',
              activeUserId === uid ? 'bg-primary text-white' : 'bg-muted'
            )}
          >
            {other?.name || 'User'}
          </Button>
        );
      })}
    </div>
  );
};
