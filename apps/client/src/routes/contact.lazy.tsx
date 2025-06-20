import Contact from '@/pages/contact';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/contact')({
  component: Contact,
});
