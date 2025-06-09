import Work from '@/pages/work';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/work')({
  component: Work,
});
