import Skills from '@/pages/resume/skills';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resume/skills')({
  component: Skills,
});
