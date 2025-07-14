import { CustomModal } from '@/components/custom-modal';
import ChatBox from '@/features/chat-box';
import { useClearOldAiMessages } from '@/hooks/useClearOldMessages';
import { useLoginErrorToast } from '@/hooks/useLoginAuthError';
import { useTheme } from '@/hooks/useTheme';
import { Toaster } from '@/lib/ui/sonner';
import type { ReactNode } from 'react';
import AnimatedCursor from 'react-animated-cursor';

export const UIWrapper = ({ children }: { children: ReactNode }) => {
  useTheme();
  useClearOldAiMessages();
  useLoginErrorToast();

  return (
    <>
      {children}
      <Toaster position="bottom-right" richColors closeButton />
      <CustomModal />
      <ChatBox />
      <AnimatedCursor
        innerSize={6}
        outerSize={30}
        innerScale={0}
        outerScale={0}
        outerAlpha={0}
        outerStyle={{ border: '2px solid var(--foreground)' }}
        innerStyle={{ backgroundColor: 'var(--foreground)' }}
        trailingSpeed={7}
      />
    </>
  );
};
