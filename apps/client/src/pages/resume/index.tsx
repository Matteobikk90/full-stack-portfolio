import ResumeSidebar from '@/features/resume-sidebar';
import { Outlet } from '@tanstack/react-router';

export const Resume = () => (
  <main className="flex flex-col lg:justify-between lg:flex-row gap-12 p-4 container mx-auto relative flex-1">
    <ResumeSidebar />
    <Outlet />
  </main>
);
