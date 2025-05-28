import About from '@/pages/about';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resume/about')({
  component: About,
});
