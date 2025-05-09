import * as Sentry from '@sentry/node';
import { Request, Response } from 'express';

export function globalErrorHandler(err: unknown, _req: Request, res: Response) {
  console.error('[Global Error Handler]', err);

  if (err instanceof Error) {
    Sentry.captureException(err);
    res.status(500).json({ message: err.message });
  } else {
    Sentry.captureMessage('Unknown error');
    res.status(500).json({ message: 'Unexpected error' });
  }
}
