import '@/auth/passport';
import authRoutes from '@/auth/auth.route';
import { Sentry } from '@/config/sentry';
import { globalErrorHandler } from '@/middleware/error.middleware';
import commentRoutes from '@/routes/comments.route';
import contactRoutes from '@/routes/contact.route';
import experiencesRoute from '@/routes/experieces';
import likeRoutes from '@/routes/likes.route';
import projectsRoute from '@/routes/projects.route';
import userRoutes from '@/routes/user.route';
import { cookieParser } from '@tinyhttp/cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://dev.matteosoresini.com',
      'https://matteosoresini.com',
      'https://www.matteosoresini.com',
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/experiences', experiencesRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (_req, res) => {
  res.send('API is working');
});

Sentry.setupExpressErrorHandler(app);
app.use(globalErrorHandler);

export default app;
