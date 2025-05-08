import request from "supertest";
import app from "@/app";

const email = `user-${Date.now()}@example.com`;
const password = "password";

describe("POST /auth/login", () => {
  beforeAll(async () => {
    await request(app)
      .post("/auth/signup")
      .send({ name: "Test User", email, password });
  });

  it("should return a token for valid credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email, password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should return 401 for invalid credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email, password: "wrongPassword" });

    expect(res.statusCode).toBe(401);
  });
});
