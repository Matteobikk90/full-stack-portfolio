import { Router } from "express";
import { login, signup } from "@/auth/auth.controller";
import { validateBody } from "@/middleware/validate";
import { loginSchema, signupSchema } from "@/validation/auth.schema";

const router = Router();

router.post("/signup", validateBody(signupSchema), signup);
router.post("/login", validateBody(loginSchema), login);

export default router;
