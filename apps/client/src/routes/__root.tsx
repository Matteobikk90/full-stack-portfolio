import App from '@/App';
import PageShell from '@/components/page-shell';
import { Pending } from '@/components/pending';
import { ErrorFallbackUI } from '@/features/error-boundary';
import NotFound from '@/pages/not-found';
import { createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  loader: () => void 0,
  component: () => (
    <PageShell>
      <App />
    </PageShell>
  ),
  errorComponent: () => (
    <PageShell>
      <ErrorFallbackUI />
    </PageShell>
  ),
  notFoundComponent: NotFound,
  pendingComponent: Pending,
});
