import { Router } from "express";
import { validateBody } from "@/middleware/validate";
import { createUserSchema } from "@/validation/user.schema";

const router = Router();

router.post("/", validateBody(createUserSchema), (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ name, email });
});

export default router;
