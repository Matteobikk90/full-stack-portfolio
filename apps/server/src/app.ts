import express from "express";
import authRoutes from "@/auth/auth.route";
import userRoutes from "@/routes/user.route";
import "@/auth/passport";
import { globalErrorHandler } from "@/middleware/error";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (_req, res) => {
  res.send("API is working");
});

app.use(globalErrorHandler);

export default app;
