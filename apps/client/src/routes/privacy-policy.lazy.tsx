import PrivacyPolicy from '@/pages/privacy-policy';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/privacy-policy')({
  component: PrivacyPolicy,
});
