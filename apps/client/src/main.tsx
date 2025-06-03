import '@/index.css';
import { queryClient } from '@/config/queryClient';
import { router } from '@/config/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// if (import.meta.env.DEV) {
//   const { worker } = await import('@/mocks/browser');
//   await worker.start();
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </StrictMode>
);
