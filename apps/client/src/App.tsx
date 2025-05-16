// import Footer from '@/features/footer';
import Header from '@/features/header';
import { Outlet } from '@tanstack/react-router';

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}
