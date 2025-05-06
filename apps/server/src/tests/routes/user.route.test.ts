import request from "supertest";
import app from "@/app";

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
