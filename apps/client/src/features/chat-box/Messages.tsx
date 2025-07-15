import PopUpInfo from '@/components/pop-up-info';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/lib/ui/button';
import { Input } from '@/lib/ui/input';
import { cn } from '@/lib/utils';
import { useStore } from '@/stores';
import { sendAIMessage } from '@/utils/ai';
import { PaperPlaneRightIcon, RobotIcon } from '@phosphor-icons/react';
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

export const Messages = () => {
  const {
    chatMode,
    socket,
    setAiMessages,
    aiMessages,
    chatMessages,
    activeUserId,
  } = useStore(
    useShallow(
      ({
        chatMode,
        socket,
        setAiMessages,
        aiMessages,
        chatMessages,
        activeUserId,
      }) => ({
        chatMode,
        socket,
        setAiMessages,
        chatMessages,
        activeUserId,
        aiMessages,
      })
    )
  );
  const { user, isAdmin } = useAuth();
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');

  const canType = socket?.connected && (!isAdmin || !!activeUserId);
  const canSend = useMemo(
    () => canType && input.trim().length > 0,
    [canType, input]
  );

  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
    inputRef.current?.focus();
  }, [chatMode, chatMessages, aiMessages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setInput('');
    inputRef.current?.focus();

    if (chatMode === 'ai') {
      const localUserMessage = {
        id: crypto.randomUUID(),
        content: input,
        createdAt: new Date().toISOString(),
        sender: user!,
        receiver: { id: 'ai', name: 'AI', avatarUrl: null },
      };

      setAiMessages(user.id, (prev) => [...prev, localUserMessage]);

      try {
        const aiReply = await sendAIMessage(input);
        const aiMessage = {
          id: crypto.randomUUID(),
          content: aiReply,
          createdAt: new Date().toISOString(),
          sender: { id: 'ai', name: 'AI', avatarUrl: null },
          receiver: user!,
        };
        setAiMessages(user.id, (prev) => [...prev, aiMessage]);
      } catch (err) {
        console.error('AI error:', err);
      }
    } else {
      return socket?.connected && socket!.emit('chat:message', input.trim());
    }
  };

  const visibleMessages =
    chatMode === 'ai'
      ? (aiMessages[user.id] ?? [])
      : (chatMessages[activeUserId ?? ''] ?? []);

  return (
    <div className="flex flex-col h-72 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-2 space-y-3" ref={scrollRef}>
        {visibleMessages.map((msg) => {
          const isOwnMessage = msg.sender?.id === user.id;
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
                isOwnMessage
                  ? 'justify-start flex-row-reverse'
                  : 'justify-start'
              )}
            >
              {typeof msg.sender?.avatarUrl === 'string' ? (
                <img
                  loading="lazy"
                  width={32}
                  height={32}
                  src={msg.sender.avatarUrl}
                  alt={msg.sender.name}
                  className="object-cover rounded-full"
                />
              ) : msg.sender?.id === 'ai' ? (
                <span className="w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium shadow-elevation">
                  <RobotIcon className="size-5" weight="duotone" />
                </span>
              ) : (
                <span
                  className={cn(
                    'bg-secondary w-8 h-8 flex items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground/70 shadow-elevation',
                    isOwnMessage ? 'bg-secondary' : 'bg-background'
                  )}
                >
                  {msg.sender?.name?.[0]?.toUpperCase() ?? '?'}
                </span>
              )}
              <div
                className={cn(
                  'rounded-xl p-3 max-w-[75%] text-sm shadow-elevation',
                  isOwnMessage
                    ? 'bg-secondary rounded-br-none'
                    : 'bg-background rounded-bl-none'
                )}
              >
                <div className="text-xs mb-1 flex gap-1">
                  <strong className="max-w-24 truncate">
                    {isOwnMessage ? 'You' : msg.sender?.name || 'Unknown'}
                  </strong>
                  <span>•</span>
                  <time dateTime={msg.createdAt}>{timestamp}</time>
                </div>
                <div className="break-words whitespace-pre-wrap">
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex border-t p-2 gap-2 justify-between"
      >
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('chat_placeholder')}
          disabled={!canType}
          maxLength={350}
          className="flex-1"
        />
        <Button type="submit" variant="outline" size="icon" disabled={!canSend}>
          <PopUpInfo hoverText={t('contact.send')} align="left">
            <PaperPlaneRightIcon className="size-5" weight="duotone" />
          </PopUpInfo>
        </Button>
      </form>
    </div>
  );
};
