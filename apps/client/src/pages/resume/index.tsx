import { Outlet } from '@tanstack/react-router';

export const Resume = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-6 max-w-6xl mx-auto">
      <Outlet />
    </main>
  );
};
