import TermsOfService from '@/pages/terms-of-service';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/terms-of-service')({
  component: TermsOfService,
});
