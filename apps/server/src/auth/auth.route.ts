import { getMe, handleRefreshToken } from '@/auth/auth.controller';
import { authenticateToken } from '@/auth/auth.middleware';
import { authRateLimiter } from '@/middleware/rate-limit.middleware';
import { Router, type Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = Router();

const createTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '30m',
  });

  const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};

const sendTokensAndRedirect = (
  res: Response,
  userId: string,
  redirect: string
) => {
  const { accessToken, refreshToken } = createTokens(userId);
  const baseRedirect = process.env.FRONTEND_URL || 'http://localhost:5173';

  res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 60 * 1000,
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .redirect(`${baseRedirect}${decodeURIComponent(redirect)}`);
};

// --- Protected Routes ---
router.get('/protected', authenticateToken, (_req, res) => {
  res.json({ message: 'Protected content' });
});

router.get('/me', authenticateToken, getMe);

router.post('/refresh', authRateLimiter, handleRefreshToken);

// --- GitHub OAuth ---
router.get('/github', authRateLimiter, (req, res, next) => {
  passport.authenticate('github', {
    scope: ['user:email'],
    session: false,
    state: req.query.state as string,
  })(req, res, next);
});

router.get(
  '/github/callback',
  authRateLimiter,
  passport.authenticate('github', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const user = req.user as { id: string };
    const redirect = (req.query.state as string) || '/';
    sendTokensAndRedirect(res, user.id, redirect);
  }
);

// --- Google OAuth ---
router.get('/google', authRateLimiter, (req, res, next) => {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
    state: req.query.state as string,
  })(req, res, next);
});

router.get(
  '/google/callback',
  authRateLimiter,
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const user = req.user as { id: string };
    const redirect = (req.query.state as string) || '/';
    sendTokensAndRedirect(res, user.id, redirect);
  }
);

// --- Facebook OAuth ---
router.get('/facebook', authRateLimiter, (req, res, next) => {
  passport.authenticate('facebook', {
    scope: ['email'],
    session: false,
    state: req.query.state as string,
  })(req, res, next);
});

router.get(
  '/facebook/callback',
  authRateLimiter,
  passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const user = req.user as { id: string };
    const redirect = (req.query.state as string) || '/';
    sendTokensAndRedirect(res, user.id, redirect);
  }
);

// --- LinkedIn OAuth ---
router.get('/linkedin', (req, res, next) => {
  console.log('[LinkedIn] Initiating OAuth flow');
  passport.authenticate('linkedin', {
    scope: ['openid', 'profile', 'email'],
    session: false,
    state: req.query.state as string,
  })(req, res, next);
});

router.get(
  '/linkedin/callback',
  (req, _, next) => {
    console.log('[LinkedIn] Callback hit, query params:', req.query);
    next();
  },
  passport.authenticate('linkedin', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const user = req.user as { id: string };
    const redirect = (req.query.state as string) || '/';
    sendTokensAndRedirect(res, user.id, redirect);
  }
);

export default router;
