import PopUpInfo from '@/components/pop-up-info';
import { useAuth } from '@/hooks/useAuth';
import { useChatSocket } from '@/hooks/useChatSocket';
import { Button } from '@/lib/ui/button';
import { Input } from '@/lib/ui/input';
import { cn } from '@/lib/utils';
import { adminEmail } from '@/utils/constants';
import { PaperPlaneRightIcon } from '@phosphor-icons/react';
import { useLayoutEffect, useRef, useState } from 'react';

export const Messages = () => {
  const { isAdmin, activeUserId, socket, messages, sendMessage } =
    useChatSocket();
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');

  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-72 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-2 space-y-3" ref={scrollRef}>
        {messages.map((msg) => {
          const timestamp = new Date(msg.createdAt).toLocaleTimeString([], {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });
          return (
            <div
              key={msg.id}
              className={cn(
                'flex items-end gap-2',
                isAdmin ? 'justify-start flex-row-reverse' : 'justify-start'
              )}
            >
              <div className="flex flex-col items-center gap-1">
                {msg.sender?.avatarUrl && (
                  <img
                    width={30}
                    height={30}
                    src={msg.sender.avatarUrl}
                    alt={msg.sender.name}
                    className="object-cover rounded-full"
                  />
                )}
              </div>
              <div
                className={cn(
                  'rounded-xl p-3 max-w-[75%] text-sm shadow-elevation',
                  isAdmin
                    ? 'bg-primary rounded-br-none'
                    : 'bg-background rounded-bl-none'
                )}
              >
                <div className="text-xs mb-1 flex gap-1">
                  <strong className="max-w-24 truncate">
                    {isAdmin ? 'You' : msg.sender?.name || 'Unknown'}
                  </strong>
                  <span>•</span>
                  <time dateTime={msg.createdAt}>{timestamp}</time>
                </div>
                <div>{msg.content}</div>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="flex border-t p-3 gap-2">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={
            !socket?.connected || (user.email === adminEmail && !activeUserId)
          }
          maxLength={350}
          className="flex-1"
        />
        <Button
          type="submit"
          variant="outline"
          size="icon"
          disabled={
            !input.trim() ||
            !socket?.connected ||
            (user.email === adminEmail && !activeUserId)
          }
        >
          <PopUpInfo hoverText="Send message" align="left">
            <PaperPlaneRightIcon className="size-5" weight="duotone" />
          </PopUpInfo>
        </Button>
      </form>
    </div>
  );
};
