import express from "express";
import userRoute from "@/routes/user.route";

const app = express();

app.use(express.json());
app.use(userRoute);

app.get("/", (_, res) => {
  res.send("API is working!");
});

export default app;
