import jwt from "jsonwebtoken";
import request from "supertest";
import app from "@/app";
import prisma from "@/utils/prisma";
import { JWT_SECRET } from "@/utils/constants";

describe("GET /auth/me", () => {
  it("should return user data with valid token", async () => {
    await prisma.user.deleteMany({ where: { email: "test@example.com" } });

    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        password: "secret",
        name: "Test User",
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const res = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("email", "test@example.com");

    await prisma.user.delete({ where: { id: user.id } });
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/auth/me");
    expect(res.status).toBe(401);
  });
});
