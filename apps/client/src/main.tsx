import '@/index.css';
import i18n from '@/config/i18n';
import { queryClient } from '@/config/queryClient';
import { router } from '@/config/router';
import { ErrorBoundary } from '@/features/error-boundary';
import { useStore } from '@/stores';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const { lang } = useStore.getState();
i18n.changeLanguage(lang);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
);
