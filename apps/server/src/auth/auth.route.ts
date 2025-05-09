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

router.get(
  '/github',
  authRateLimiter,
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const user = req.user as { id: string };

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

    res.json({ accessToken, refreshToken });
  }
);

router.get(
  '/google',
  authRateLimiter,
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const user = req.user as { id: string };

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

    res.json({ accessToken, refreshToken });
  }
);

export default router;
