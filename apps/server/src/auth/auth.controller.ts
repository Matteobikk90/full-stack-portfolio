import prisma from '@/utils/prisma';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// export const signup = async (req: Request, res: Response) => {
//   const { name, email, password } = req.body;

//   const existingUser = await prisma.user.findUnique({ where: { email } });
//   if (existingUser) {
//     res.status(400).json({ message: 'User already exists' });
//     return;
//   }

//   const hashedPassword = await hashPassword(password);
//   const user = await prisma.user.create({
//     data: { name, email, password: hashedPassword },
//   });

//   const token = generateToken({ userId: user.id });
//   res.json({ token });
// };

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const user = await prisma.user.findUnique({ where: { email } });
//   const isValid = user && (await comparePasswords(password, user.password!));

//   if (!isValid) {
//     res.status(401).json({ message: 'Invalid credentials' });
//     return;
//   }

//   const token = generateToken({ userId: user.id });
//   res.json({ token });
// };

export const handleRefreshToken = (req: Request, res: Response): void => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    res.status(400).json({ message: 'Missing refresh token' });
    return;
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET!,
      { expiresIn: '30m' }
    );

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 60 * 1000,
    });

    res.status(200).json({ message: 'Access token refreshed' });
  } catch (err) {
    console.error('❌ Refresh token error:', err);
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  const userId = (req.user && (req.user as { userId: string }).userId) || null;
  console.log('🔐 req.user:', req.user);

  if (!userId) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
};
