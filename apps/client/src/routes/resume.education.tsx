import Education from '@/pages/resume/education';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resume/education')({
  component: Education,
});
