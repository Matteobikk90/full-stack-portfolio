import Education from '@/pages/resume/education';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/resume/education')({
  component: Education,
});
