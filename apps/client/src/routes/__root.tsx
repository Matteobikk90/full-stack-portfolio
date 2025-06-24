import App from '@/App';
import { Pending } from '@/components/pending/Pending';
import { ErrorFallbackUI } from '@/features/error-boundary/ErrorFallbackUI';
import NotFound from '@/pages/not-found';
import { createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: App,
  errorComponent: ErrorFallbackUI,
  notFoundComponent: NotFound,
  pendingComponent: Pending,
});
