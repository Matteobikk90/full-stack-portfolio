import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePasswords, generateToken } from "./auth.utils";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

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
  if (!user || !(await comparePasswords(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({ userId: user.id });
  res.json({ token });
};
