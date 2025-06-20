import DeleteData from '@/pages/delete-data';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/delete-data')({
  component: DeleteData,
});
