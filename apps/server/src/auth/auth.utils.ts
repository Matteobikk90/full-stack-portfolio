import { JWT_SECRET } from "@/utils/constants";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 10);

export const comparePasswords = async (plain: string, hash: string) =>
  bcrypt.compare(plain, hash);

export const generateToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "30m" });
