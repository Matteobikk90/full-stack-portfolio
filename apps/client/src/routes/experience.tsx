import Experience from '@/pages/experience';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/experience')({
  component: Experience,
});
