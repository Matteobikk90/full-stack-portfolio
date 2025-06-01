import About from '@/pages/resume/about';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resume/about')({
  component: About,
});
