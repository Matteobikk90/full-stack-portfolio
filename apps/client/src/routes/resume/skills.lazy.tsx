import Skills from '@/pages/resume/skills';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/resume/skills')({
  component: Skills,
});
