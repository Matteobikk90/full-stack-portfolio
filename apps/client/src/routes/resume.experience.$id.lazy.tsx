import { Pending } from '@/components/pending';
import { Info } from '@/pages/resume/experience/Info';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/resume/experience/$id')({
  component: Info,
  pendingComponent: Pending,
});
