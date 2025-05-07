import request from "supertest";
import app from "@/app";

describe("GET /auth/github", () => {
  it("should redirect to GitHub OAuth", async () => {
    const res = await request(app).get("/auth/github");

    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toContain("github.com/login/oauth");
  });
});
