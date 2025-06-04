import Work from '@/pages/work';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/work')({
  component: Work,
});
