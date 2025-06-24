import CustomModal from '@/components/custom-modal';
import ChatBox from '@/features/chat-box';
import { useTheme } from '@/hooks/useTheme';
import { Toaster } from '@/lib/ui/sonner';
import { Outlet } from '@tanstack/react-router';
import AnimatedCursor from 'react-animated-cursor';

export default function App() {
  useTheme();

  return (
    <>
      <Outlet />
      <Toaster position="bottom-right" richColors closeButton />
      <CustomModal />
      <ChatBox />
      <AnimatedCursor
        innerSize={6}
        outerSize={30}
        innerScale={0}
        outerScale={0}
        outerAlpha={0}
        outerStyle={{
          border: '2px solid var(--foreground)',
        }}
        innerStyle={{
          backgroundColor: 'var(--foreground)',
        }}
      />
    </>
  );
}
