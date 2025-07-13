import { Pending } from '@/components/pending';
import Search from '@/pages/search';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/search/')({
  component: Search,
  pendingComponent: Pending,
});
