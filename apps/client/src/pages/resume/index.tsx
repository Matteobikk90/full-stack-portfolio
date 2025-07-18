import ResumeSidebar from '@/features/resume-sidebar';
import { Outlet } from '@tanstack/react-router';

export const Resume = () => (
  <main className="flex flex-col lg:justify-between lg:flex-row gap-6 md:gap-12 p-4">
    <ResumeSidebar />
    <Outlet />
  </main>
);
