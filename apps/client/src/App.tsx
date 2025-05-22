// import Footer from '@/features/footer';
import CustomModal from '@/components/custom-modal';
import Header from '@/features/header';
import { Toaster } from '@/lib/ui/sonner';
import { Outlet } from '@tanstack/react-router';

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
      <Toaster position="bottom-right" richColors closeButton />
      <CustomModal />
    </>
  );
}
