import { Pending } from '@/components/pending';
import { Resume } from '@/pages/resume';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resume')({
  component: Resume,
  loader: () => ({ crumb: 'Resume' }),
  pendingComponent: Pending,
});
