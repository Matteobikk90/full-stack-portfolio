import Experience from '@/pages/resume/experience';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/resume/experience')({
  component: Experience,
});
