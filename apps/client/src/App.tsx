// import Footer from '@/features/footer';
import CustomModal from '@/components/custom-modal';
import ChatBox from '@/features/chat-box';
import Header from '@/features/header';
import { Toaster } from '@/lib/ui/sonner';
import { Outlet } from '@tanstack/react-router';
import AnimatedCursor from 'react-animated-cursor';

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
      <Toaster position="bottom-right" richColors closeButton />
      <CustomModal />
      <ChatBox />
      <AnimatedCursor
        innerSize={6}
        outerSize={30}
        outerScale={1.5}
        outerStyle={{
          border: '1px solid var(--foreground)',
          backgroundColor: 'var(--background)',
        }}
        innerStyle={{
          backgroundColor: 'var(--foreground)',
        }}
      />
    </>
  );
}
