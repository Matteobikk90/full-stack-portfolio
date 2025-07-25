import { PORT } from '@/utils/constants';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

export function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN!,
    sendDefaultPii: true,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    profileLifecycle: 'trace',
    environment: String(PORT) === '4000' ? 'development' : 'production',
  });
}

export { Sentry };
