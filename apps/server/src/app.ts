import '@/auth/passport';
import authRoutes from '@/auth/auth.route';
import { Sentry } from '@/config/sentry';
import { globalErrorHandler } from '@/middleware/error.middleware';
import commentRoutes from '@/routes/comments.route';
import experiencesRoute from '@/routes/experiences.route';
import projectsRoute from '@/routes/projects.route';
import userRoutes from '@/routes/user.route';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

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
app.use('/api/experiences', experiencesRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/comments', commentRoutes);

app.get('/', (_req, res) => {
  res.send('API is working');
});

Sentry.setupExpressErrorHandler(app);
app.use(globalErrorHandler);

export default app;
