import ResumeSidebar from '@/features/resume-sidebar';
import { Outlet } from '@tanstack/react-router';

export const Resume = () => {
  return (
    <main className="flex flex-col justify-between lg:flex-row gap-12 p-4 container mx-auto relative z-11">
      <ResumeSidebar />
      <Outlet />
    </main>
  );
};
