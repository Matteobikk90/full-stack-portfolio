import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/lib/ui/button';
import { cn } from '@/lib/utils';
import { useStore } from '@/stores';
import { useShallow } from 'zustand/shallow';

export const Tabs = () => {
  const { user } = useAuth();
  const { activeUserId, threads, selectUser } = useStore(
    useShallow(({ activeUserId, threads, selectUser }) => ({
      activeUserId,
      threads,
      selectUser,
    }))
  );

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
