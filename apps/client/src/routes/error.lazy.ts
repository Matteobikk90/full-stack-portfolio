import { ErrorFallbackUI } from '@/features/error-boundary';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/error')({
  component: ErrorFallbackUI,
});
