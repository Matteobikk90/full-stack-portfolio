import About from '@/pages/resume/about';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/resume/about')({
  component: About,
});
