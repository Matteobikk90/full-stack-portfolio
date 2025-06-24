import App from '@/App';
import { ErrorFallbackUI } from '@/features/error-boundary/ErrorFallbackUI';
import { createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => <App />,
  errorComponent: ErrorFallbackUI,
});
