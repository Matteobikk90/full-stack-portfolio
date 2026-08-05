import ChatBox from '@/features/chat-box';
import { useClearOldAiMessages } from '@/hooks/useClearOldMessages';
import { useLoginErrorToast } from '@/hooks/useLoginAuthError';
import { useTheme } from '@/hooks/useTheme';
import { Toaster } from '@/lib/ui/sonner';
import { useStore } from '@/stores';
import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react';

const CustomModal = lazy(() => import('@/components/custom-modal/CustomModal'));
const AnimatedCursor = lazy(() => import('react-animated-cursor'));

export const UIWrapper = ({ children }: { children: ReactNode }) => {
  const activeModal = useStore(({ activeModal }) => activeModal);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useTheme();
  useClearOldAiMessages();
  useLoginErrorToast();

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    );
    const updatePointer = () => setHasFinePointer(pointerQuery.matches);

    updatePointer();
    pointerQuery.addEventListener('change', updatePointer);

    return () => pointerQuery.removeEventListener('change', updatePointer);
  }, []);

  return (
    <>
      {children}
      <Toaster position="bottom-right" richColors closeButton />
      {activeModal && (
        <Suspense fallback={null}>
          <CustomModal />
        </Suspense>
      )}
      <ChatBox />
      {hasFinePointer && (
        <Suspense fallback={null}>
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
        </Suspense>
      )}
    </>
  );
};
