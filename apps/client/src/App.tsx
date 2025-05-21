// import Footer from '@/features/footer';
import Header from '@/features/header';
import { Toaster } from '@/lib/ui/sonner';
import { Outlet } from '@tanstack/react-router';

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
      <Toaster
        position="bottom-right"
        theme="light"
        toastOptions={{
          classNames: {
            toast: 'rounded-xl border border-muted shadow-lg bg-background',
            title: 'font-semibold text-foreground',
            description: 'text-foreground text-sm',
            actionButton: 'bg-primary text-white',
            cancelButton: 'text-foreground',
          },
        }}
        expand
        richColors
        closeButton
      />
    </>
  );
}
