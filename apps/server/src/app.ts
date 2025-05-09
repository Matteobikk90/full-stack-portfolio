import authRoutes from '@/auth/auth.route';
import { Sentry } from '@/config/sentry';
import userRoutes from '@/routes/user.route';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import '@/auth/passport';
import { globalErrorHandler } from '@/middleware/error';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (_req, res) => {
  res.send('API is working');
});

Sentry.setupExpressErrorHandler(app);
app.use(globalErrorHandler);

export default app;
