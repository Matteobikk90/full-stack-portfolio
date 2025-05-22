import { getMe, handleRefreshToken } from '@/auth/auth.controller';
import { authenticateToken } from '@/auth/auth.middleware';
import { authRateLimiter } from '@/middleware/rate-limit.middleware';
import { validateBody } from '@/middleware/validate.middleware';
import { refreshSchema } from '@/validation/auth.schema';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = Router();

// router.post('/signup', authRateLimiter, validateBody(signupSchema), signup);
// router.post('/login', authRateLimiter, validateBody(loginSchema), login);

router.get('/protected', authenticateToken, (_req, res) => {
  res.json({ message: 'Protected content' });
});

router.post(
  '/refresh',
  authRateLimiter,
  validateBody(refreshSchema),
  handleRefreshToken
);

router.get('/me', authenticateToken, getMe);

router.get('/github', authRateLimiter, (req, res, next) => {
  const state = req.query.state as string;

  passport.authenticate('github', {
    scope: ['user:email'],
    session: false,
    state,
  })(req, res, next);
});

router.get(
  '/github/callback',
  authRateLimiter,
  passport.authenticate('github', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const user = req.user as { id: string };
    const redirect = req.query.state || '/';

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      {
        expiresIn: '7d',
      }
    );

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .redirect(
        `http://localhost:5173${decodeURIComponent(redirect as string)}`
      );
  }
);

router.get('/google', (req, res, next) => {
  const state = req.query.state as string;

  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
    state,
  })(req, res, next);
});

router.get(
  '/google/callback',
  authRateLimiter,
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const user = req.user as { id: string };
    const redirect = req.query.state || '/';

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      {
        expiresIn: '7d',
      }
    );

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .redirect(
        `http://localhost:5173${decodeURIComponent(redirect as string)}`
      );
  }
);

export default router;
