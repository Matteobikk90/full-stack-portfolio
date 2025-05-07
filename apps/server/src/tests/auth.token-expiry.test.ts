import request from "supertest";
import app from "@/app";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

describe("GET /auth/protected", () => {
  it("should return 401 if the token is expired", async () => {
    const expiredToken = jwt.sign({ userId: "test-user" }, JWT_SECRET, {
      expiresIn: -10,
    });

    const res = await request(app)
      .get("/auth/protected")
      .set("Authorization", `Bearer ${expiredToken}`);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Token expired");
  });

  it("should allow access with valid token", async () => {
    const token = jwt.sign({ userId: "test-user" }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const res = await request(app)
      .get("/auth/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Protected content");
  });

  it("should deny access without token", async () => {
    const res = await request(app).get("/auth/protected");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Missing token");
  });
});
