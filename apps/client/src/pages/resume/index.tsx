import ResumeSidebar from '@/components/resume-sidebar';
import { Outlet } from '@tanstack/react-router';

export const Resume = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[auto_1fr] md:gap-12 lg:gap-24 p-4 max-w-6xl mx-auto">
      <ResumeSidebar />
      <Outlet />
    </main>
  );
};
