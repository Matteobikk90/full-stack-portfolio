import Projects from '@/pages/projects';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/projects')({
  component: () => <Projects />,
});
