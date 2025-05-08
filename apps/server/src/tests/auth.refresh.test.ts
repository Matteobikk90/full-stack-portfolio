import request from "supertest";
import jwt from "jsonwebtoken";
import app from "@/app";
import { JWT_SECRET } from "@/utils/constants";

describe("POST /auth/refresh", () => {
  it("should return a new access token with valid refresh token", async () => {
    const refreshToken = jwt.sign({ userId: "test-user" }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const res = await request(app).post("/auth/refresh").send({ refreshToken });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).post("/auth/refresh").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should return 403 if token is invalid", async () => {
    const res = await request(app)
      .post("/auth/refresh")
      .send({ refreshToken: "invalid" });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Invalid or expired refresh token");
  });

  it("should return 403 if token is expired", async () => {
    const expiredToken = jwt.sign({ userId: "test-user" }, JWT_SECRET, {
      expiresIn: "-10s", // expired
    });

    const res = await request(app)
      .post("/auth/refresh")
      .send({ refreshToken: expiredToken });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Invalid or expired refresh token");
  });
});
