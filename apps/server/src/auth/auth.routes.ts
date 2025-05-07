import { Router } from "express";
import { login, signup } from "@/auth/auth.controller";
import { validateBody } from "@/middleware/validate";
import { loginSchema, signupSchema } from "@/validation/auth.schema";
import { authenticateToken } from "./auth.middleware";

const router = Router();

router.post("/signup", validateBody(signupSchema), signup);
router.post("/login", validateBody(loginSchema), login);
router.get("/protected", authenticateToken, (_req, res) => {
  res.json({ message: "Protected content" });
});

export default router;
