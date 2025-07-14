import { Pending } from '@/components/pending';
import { Resume } from '@/pages/resume';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/resume')({
  component: Resume,
  pendingComponent: Pending,
});
