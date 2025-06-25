import DevLoginPage from '@/pages/dev-login';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dev-login')({
  component: DevLoginPage,
});
