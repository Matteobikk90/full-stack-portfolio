import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/resume/')({
  beforeLoad: () => {
    throw redirect({ to: '/resume/experience' });
  },
  loader: () => ({ crumb: 'Resume' }),
});
