import request from "supertest";
import app from "@/app";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/utils/constants";

describe("GET /auth/me", () => {
  it("should return user data with valid token", async () => {
    const token = jwt.sign({ userId: "test-user" }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const res = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("userId", "test-user");
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/auth/me");
    expect(res.status).toBe(401);
  });
});

describe("POST /api/user", () => {
  it("creates a user with valid input", async () => {
    const res = await request(app)
      .post("/api/user")
      .send({ name: "Matteo", email: "matteo@example.com" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      name: "Matteo",
      email: "matteo@example.com",
    });
  });

  it("returns 400 with invalid input", async () => {
    const res = await request(app)
      .post("/api/user")
      .send({ name: "", email: "not-an-email" });

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});
