import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resume/tech-stack')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/resume/tech-stack"!</div>;
}
