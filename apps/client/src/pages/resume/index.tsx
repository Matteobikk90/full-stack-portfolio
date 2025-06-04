import ResumeSidebar from '@/components/resume-sidebar';
import { Outlet } from '@tanstack/react-router';

export const Resume = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-24 p-4 container mx-auto">
      <ResumeSidebar />
      <Outlet />
    </main>
  );
};
