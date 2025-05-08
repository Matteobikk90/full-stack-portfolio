import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  hashPassword,
  comparePasswords,
  generateToken,
} from "@/auth/auth.utils";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const token = generateToken({ userId: user.id });
  res.json({ token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  const isValid = user && (await comparePasswords(password, user.password!));

  if (!isValid) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = generateToken({ userId: user.id });
  res.json({ token });
};

export const handleRefreshToken = (req: Request, res: Response): void => {
  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
