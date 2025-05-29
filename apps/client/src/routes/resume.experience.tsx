import Experience from '@/pages/experience';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resume/experience')({
  component: Experience,
});
