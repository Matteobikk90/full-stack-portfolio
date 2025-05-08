import { Router } from "express";
import { validateBody } from "@/middleware/validate";
import { createUserSchema } from "@/validation/user.schema";
import { authenticateToken } from "@/auth/auth.middleware";

const router = Router();

router.get("/me", authenticateToken, (req, res) => {
  const user = req.user as { userId: string };
  res.json({ userId: user.userId });
});

router.post("/", validateBody(createUserSchema), (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ name, email });
});

export default router;
