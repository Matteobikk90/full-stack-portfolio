import express from "express";
import authRoutes from "@/auth/auth.routes";
import userRoutes from "@/routes/user.route";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (_: express.Request, res: express.Response) => {
  res.send("API is working");
});

export default app;
