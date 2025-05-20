import TermsOfService from '@/pages/terms-of-service';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/terms-of-service')({
  component: TermsOfService,
});
