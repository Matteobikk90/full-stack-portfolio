import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 10);

export const comparePasswords = async (plain: string, hash: string) =>
  bcrypt.compare(plain, hash);

export const generateToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
